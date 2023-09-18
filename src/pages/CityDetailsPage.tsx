import React, { useEffect, useState } from "react";
import { fetch5DayForecastData, fetchWeatherData } from "../api";
import { WeatherData, ForecastData, UnitTypes } from "../types";
import { useParams } from "react-router-dom";
import CityDetails from "../components/CityDetails";
import { toast } from "react-toastify";

interface CityDetailsPageProps {
  unit: UnitTypes;
}

const CityDetailsPage = ({ unit }: CityDetailsPageProps) => {
  const { name = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<ForecastData[]>();

  useEffect(() => {
    fetchWeatherData(name, unit)
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        toast.error(
          `Failed to load weather data for ${name}: ${error.message}`
        );
      });
    fetch5DayForecastData(name, unit)
      .then((data) => {
        setForecastData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        toast.error(
          `Failed to load forecast data for ${name}: ${error.message}`
        );
      });
  }, [name, unit]);

  if (!name) return null;
  if (loading) return <h6>Loading...</h6>;
  if (error) return <h6>{error}</h6>;
  return weatherData && forecastData ? (
    <CityDetails data={weatherData} forecastData={forecastData} unit={unit} />
  ) : null;
};

export default CityDetailsPage;
