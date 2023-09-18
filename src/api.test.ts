import { fetchWeatherData, fetch5DayForecastData, cache } from "./api";

describe("fetchWeatherData", () => {
  it("should return weather data for a valid city name", async () => {
    const data = await fetchWeatherData("London");
    expect(data.name).toBe("London");
    expect(data.main.temp).toBeDefined();
    expect(data.weather[0].description).toBeDefined();
  });

  it("data should be different for both units", async () => {
    const data = await fetchWeatherData("London", "metric");
    const data2 = await fetchWeatherData("London", "imperial");
    expect(data).not.toBe(data2);
  });

  it("should have all the required data", async () => {
    const data = await fetchWeatherData("London", "metric");
    const { name, main, weather, sys, wind } = data;
    const { country } = sys;
    const { speed, deg } = wind;
    const { temp, temp_min, temp_max, feels_like, pressure, humidity } = main;
    const { main: weatherMain, description, icon } = weather[0];
    expect(name).toBeDefined();
    expect(country).toBeDefined();
    expect(speed).toBeDefined();
    expect(deg).toBeDefined();
    expect(temp).toBeDefined();

    expect(temp_min).toBeDefined();
    expect(temp_max).toBeDefined();
    expect(feels_like).toBeDefined();
    expect(pressure).toBeDefined();
    expect(humidity).toBeDefined();

    expect(weatherMain).toBeDefined();
    expect(description).toBeDefined();
    expect(icon).toBeDefined();
  });

  it("should return cached data for a valid city name and unit", async () => {
    const cacheKey = JSON.stringify(["London", "metric", "weather"]);
    const data = await fetchWeatherData("London", "metric");
    expect(cache[cacheKey].data).toBe(data);
    expect(cache[cacheKey].date).toBeInstanceOf(Date);

    const cacheKey2 = JSON.stringify(["London", "imperial", "weather"]);
    const data2 = await fetchWeatherData("London", "imperial");
    expect(cache[cacheKey2].data).toBe(data2);
  });

  // should not return cached data after 1 minute
  it("should not return cached data after 1 minute", async () => {
    const cacheKey = JSON.stringify(["London", "metric", "weather"]);
    await fetchWeatherData("London", "metric");

    // set the date to 2 minutes ago
    const date = new Date(Date.now() - 2 * 60 * 1000);
    cache[cacheKey].date = date;

    await fetchWeatherData("London", "metric");
    expect(cache[cacheKey].date).not.toBe(date);
  });
});

describe("fetch5DayForecastData", () => {
  it("should have 5 days of data", async () => {
    const data = await fetch5DayForecastData("London", "metric");
    expect(data.length).toBe(5);
  });

  it("data should be different for both units", async () => {
    const data = await fetch5DayForecastData("London", "metric");
    const data2 = await fetch5DayForecastData("London", "imperial");
    expect(data).not.toBe(data2);
  });

  it("should have all the required data", async () => {
    const data = await fetch5DayForecastData("London", "metric");
    const { dt, main, weather } = data[0];
    const { temp } = main;
    const { description, icon } = weather[0];
    expect(dt).toBeDefined();
    expect(main).toBeDefined();
    expect(weather).toBeDefined();
    expect(temp).toBeDefined();
    expect(description).toBeDefined();
    expect(icon).toBeDefined();
  });
});
