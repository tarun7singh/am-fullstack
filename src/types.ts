export interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  sys: {
    country: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

export interface ForecastData {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export type UnitTypes = "metric" | "imperial";
