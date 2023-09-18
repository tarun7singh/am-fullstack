// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { fetch5DayForecastData, fetchWeatherData } from "../api";
import WeatherCard from "../components/WeatherCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UnitTypes } from "../types";

interface DashboardProps {
  unit: UnitTypes;
  cities: string[];
  onRemove: (name: string) => void;
}

function Dashboard({ unit, cities, onRemove }: DashboardProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    Promise.all(cities.map((city) => fetchWeatherData(city, unit)))
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        toast.error(`Failed to load weather data: ${error.message}`);
      });

    Promise.all(cities.map((city) => fetch5DayForecastData(city, unit)))
      .then((data) => {
        setForecastData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        toast.error(`Failed to load forecast data: ${error.message}`);
      });
  }, [cities, unit]);

  return (
    <div className="p-8">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-24">
        {loading ? <h6>Loading...</h6> : null}
        {error ? <h6>{error}</h6> : null}
        {!loading && !error
          ? weatherData.map((data, i) => (
              <Link key={data.name} to={`/city/${data.name}`}>
                <WeatherCard
                  data={data}
                  forecastData={forecastData[i]}
                  unit={unit}
                  onRemove={onRemove}
                />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
}

export default Dashboard;
