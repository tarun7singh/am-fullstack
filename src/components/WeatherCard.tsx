import { UnitTypes, WeatherData, ForecastData } from "../types";
import { formatDay, getIconUrl } from "../utils";

// WeatherCard.tsx
interface WeatherCardProps {
  data: WeatherData;
  unit: UnitTypes;
  forecastData: ForecastData[];
  onRemove: (name: string) => void;
}

function WeatherCard({
  data,
  unit,
  forecastData = [],
  onRemove,
}: WeatherCardProps) {
  const { name, main, weather, sys } = data;
  const { country } = sys;
  const { temp } = main;
  const { description, icon } = weather[0];

  return (
    <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-96 dark:bg-gray-600">
      <div className="px-6 py-6 relative">
        <div className="flex justify-between">
          <h6 className="font-medium text-3xl">
            {name}, {country}
          </h6>
          <button
            className="inline-flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-lg font-medium rounded-lg"
            onClick={() => onRemove(name)}
            data-testid="remove-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <div className="flex mb-4 justify-between items-center">
          <h4 className="mb-0 capitalize">{description}</h4>
          <div className="text-right flex items-center">
            <img className="w-16" src={getIconUrl(icon)} alt={description} />
            <h4 className="font-bold text-3xl mb-0">
              <span>
                {temp.toFixed(1)}
                {unit === "metric" ? "°C" : "°F"}
              </span>
            </h4>
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
                key={i}
                className="text-center mb-0 flex items-center flex-col justify-evenly"
              >
                <span className="block my-1">{formatDay(dt)}</span>
                <img
                  className="w-12"
                  src={getIconUrl(icon)}
                  alt={description}
                />
                <span className="block my-1">
                  {temp.toFixed(0)}
                  {unit === "metric" ? "°C" : "°F"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
