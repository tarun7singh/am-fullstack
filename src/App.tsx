// App.tsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CityDetailsPage from "./pages/CityDetailsPage";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UnitTypes } from "./types";

function App() {
  const [unit, setUnit] = useState<UnitTypes>("metric");
  const [cities, setCities] = useState<string[]>([
    "London",
    "New York",
    "Tokyo",
    "Delhi",
  ]);

  const onRemove = (name: string) => {
    setCities((prevCities) => prevCities.filter((city) => city !== name));
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <BrowserRouter>
      <ToastContainer limit={1} />
      <Header unit={unit} setUnit={toggleUnit} setCities={setCities} />
      <div className="pt-24 max-w-screen-md mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                cities={cities}
                unit={unit}
                onRemove={onRemove}
              ></Dashboard>
            }
          />
          <Route path="/city/:name" element={<CityDetailsPage unit={unit} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
