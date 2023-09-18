import React from "react";
import { formatDay, getIconUrl } from "../utils";
import { WeatherData, ForecastData, UnitTypes } from "../types";

interface CityDetailsProps {
  data: WeatherData;
  forecastData: ForecastData[];
  unit: UnitTypes;
}

const CityDetails = ({ data, forecastData, unit }: CityDetailsProps) => {
  const { name, main, weather, sys, wind } = data;
  const { country } = sys;
  const { speed, deg } = wind;
  const { temp, temp_min, temp_max, feels_like, pressure, humidity } = main;
  const { main: weatherMain, description, icon } = weather[0];

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap">
        <div className="w-full px-2">
          <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full dark:bg-gray-600">
            <div className="px-6 py-6 relative">
              <div className="flex mb-4 justify-between items-center">
                <div>
                  <h4 className="font-medium text-3xl">
                    {name}, {country}
                  </h4>
                  <h4 className="mb-0 capitalize">{weatherMain}</h4>
                  <h4 className="mb-0 capitalize">{description}</h4>
                </div>
                <div className="text-right flex items-center">
                  <img
                    className="w-16"
                    src={getIconUrl(icon)}
                    alt={description}
                  />
                  <h4 className="font-bold text-3xl mb-0">
                    <span>
                      {temp.toFixed(1)}
                      {unit === "metric" ? "°C" : "°F"}
                    </span>
                  </h4>
                </div>
              </div>
              <div className="block sm:flex justify-between items-center flex-wrap">
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp</span>
                    <span className="px-2 inline-block">{temp}&deg;</span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Feels like</span>
                    <span className="px-2 inline-block">{feels_like}&deg;</span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp min</span>
                    <span className="px-2 inline-block">{temp_min}&deg;</span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Temp max</span>
                    <span className="px-2 inline-block">{temp_max}&deg;</span>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Pressure</span>
                    <span className="px-2 inline-block">{pressure} hPa</span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Humidity</span>
                    <span className="px-2 inline-block">{humidity} %</span>
                  </div>
                </div>

                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Wind</span>
                    <span className="px-2 inline-block">
                      {speed.toFixed(1)}
                      {unit === "metric" ? " meter/sec" : " miles/hour"}
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="flex mb-2 justify-between items-center">
                    <span>Wind Direction</span>
                    <span className="px-2 inline-block">{deg}&deg;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 relative">
              <div className="text-center justify-between items-center flex">
                {forecastData.map((data, i) => {
                  const { dt, main, weather } = data;
                  const { temp } = main;
                  const { description, icon } = weather[0];

                  return (
                    <div
                      className="text-center mb-0 flex items-center flex-col justify-evenly"
                      key={i}
                    >
                      <span className="block my-1">{formatDay(dt)}</span>
                      <img
                        className="w-12"
                        src={getIconUrl(icon)}
                        alt={description}
                      />
                      <span className="block my-1 capitalize">
                        {description}
                      </span>
                      <span className="block my-1">
                        {temp.toFixed(1)}
                        {unit === "metric" ? "°C" : "°F"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetails;
