import { WeatherData, ForecastData, UnitTypes } from "./types";

interface ApiError {
  message: string;
  code?: number;
}

interface ForecastDataWrapper {
  list: ForecastData[];
}

export const cache: {
  [query: string]: { data: WeatherData | ForecastDataWrapper; date: Date };
} = {};

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_TIMEOUT = 5000;
const API_RETRY_COUNT = 1;

const getApiKey = (): string => {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("No API keys found");
  }
  return apiKey;
};

// get cache data with cache key only if data is older than 1 minutes
const getCachedData = (key: string) => {
  const cachedData = cache[key];
  if (cachedData && new Date().getTime() - cachedData.date.getTime() < 60000) {
    return cachedData.data;
  }
};

// set cache data with cache key, current date and data
const setCachedData = (
  key: string,
  data: WeatherData | ForecastDataWrapper
) => {
  cache[key] = {
    data,
    date: new Date(),
  };
};

export const fetchData = async (
  query: string,
  units: UnitTypes = "metric",
  type: "weather" | "forecast"
): Promise<WeatherData | ForecastDataWrapper> => {
  const cacheKey = JSON.stringify([query, units, type]);
  if (getCachedData(cacheKey)) {
    return getCachedData(cacheKey) as WeatherData | ForecastDataWrapper;
  }

  let error: ApiError | undefined;
  for (let i = 0; i < API_RETRY_COUNT; i++) {
    try {
      const response = await Promise.race([
        fetch(
          `${API_BASE_URL}/${type}?q=${query}&units=${units}&appid=${getApiKey()}`
        ),
        new Promise<Response>((_, reject) =>
          setTimeout(
            () => reject(new Error("API request timed out")),
            API_TIMEOUT
          )
        ),
      ]);
      if (!response.ok) {
        error = {
          message: "Failed to fetch weather data",
          code: response.status,
        };
        continue;
      }
      const data: WeatherData | ForecastDataWrapper = await response.json();
      setCachedData(cacheKey, data);
      return data;
    } catch (e) {
      console.error(e);
      continue;
    }
  }
  throw new Error(error?.message || `Failed to fetch ${type} data`);
};

export async function fetchWeatherData(
  city: string,
  units: UnitTypes = "metric"
) {
  return fetchData(city, units, "weather") as Promise<WeatherData>;
}

export async function fetch5DayForecastData(
  city: string,
  units: UnitTypes = "metric"
) {
  const data = (await fetchData(
    city,
    units,
    "forecast"
  )) as ForecastDataWrapper;
  const forecastData: ForecastData[] = data.list.filter((item) =>
    item.dt_txt.endsWith("12:00:00")
  );
  return forecastData;
}
