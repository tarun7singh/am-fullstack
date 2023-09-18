import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UnitTypes } from "../types";

interface HeaderProps {
  unit: UnitTypes;
  setUnit: () => void;
  setCities: (any: any) => void;
}

const Header = ({ unit, setUnit, setCities }: HeaderProps) => {
  const [city, setCity] = useState("");
  const addCity = () => {
    setCities((prevCities: string[]) => {
      if (prevCities.includes(city)) return prevCities;
      return [...prevCities, city];
    });
    setCity("");
  };

  return (
    <header className="mb-4 fixed w-full z-10">
      <nav className="bg-gray-700 px-4 w-100">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <Link to={"/"}>
            <h1 className="text-2xl font-bold text-gray-50">Air Mason</h1>
          </Link>
          <div className="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
            <input
              className="outline-none ml-2"
              type="text"
              placeholder="Add new city"
              value={city}
              data-testid="add-input"
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addCity();
              }}
            />
            <button onClick={addCity} data-testid="add-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={unit === "imperial"}
              onChange={setUnit}
              className="sr-only"
            />
            <span className="label flex items-center text-sm font-medium text-white">
              Metric
            </span>
            <span
              className={
                "slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 bg-gray-400"
              }
            >
              <span
                className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                  unit === "imperial" ? "translate-x-[28px]" : ""
                }`}
              ></span>
            </span>
            <span className="label flex items-center text-sm font-medium text-white">
              Imperial
            </span>
          </label>
        </div>
      </nav>
    </header>
  );
};

export default Header;
