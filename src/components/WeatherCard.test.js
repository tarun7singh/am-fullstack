import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WeatherCard from "./WeatherCard";

describe("WeatherCard", () => {
    const data = {
        name: "London",
        main: {
            temp: 20,
        },
        weather: [
            {
                description: "Cloudy",
                icon: "01d",
            },
        ],
        sys: {
            country: "GB",
        },
    };
    const forecastData = [
        {
            dt_txt: "2021-09-01 12:00:00",
            main: {
                temp: 20,
            },
            weather: [
                {
                    description: "Cloudy",
                    icon: "01d",
                },
            ],
        },
    ];

    it("should render the city name, temperature, and weather icon", () => {
        render(
            <BrowserRouter><WeatherCard
                data={data}
                unit="metric"
                forecastData={forecastData}
                onRemove={() => { }}
            /></BrowserRouter>
        );
        const cityName = screen.getByText("London, GB");
        expect(cityName).toBeInTheDocument();
        const temperature = screen.getByText("20°C");
        expect(temperature).toBeInTheDocument();
    });

    it("should call the onRemove function when the remove button is clicked", () => {
        const onRemove = jest.fn();
        render(
            <BrowserRouter><WeatherCard
                data={data}
                unit="metric"
                forecastData={forecastData}
                onRemove={onRemove}
            /></BrowserRouter>
        );
        const removeButton = screen.getByTestId("remove-button");
        fireEvent.click(removeButton);
        expect(onRemove).toHaveBeenCalledWith("London");
    });
});