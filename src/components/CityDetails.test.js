import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CityDetails from "./CityDetails";

describe("CityDetails", () => {
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
        wind: {
            speed: 10,
            deg: 180,
        }
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

    it("should render the city name and country code", () => {
        render(
            <BrowserRouter>
                <CityDetails data={data} unit="metric" forecastData={forecastData} />
            </BrowserRouter>
        );
        const cityName = screen.getByText("London, GB");
        expect(cityName).toBeInTheDocument();
    });

    // it("should render the weather icon and description", () => {
    //     render(
    //         <BrowserRouter>
    //             <CityDetails data={data} unit="metric" forecastData={forecastData} />
    //         </BrowserRouter>
    //     );
    //     const weatherIcon = screen.getByAltText("Cloudy");
    //     expect(weatherIcon).toBeInTheDocument();
    //     const weatherDescription = screen.getByText("Cloudy");
    //     expect(weatherDescription).toBeInTheDocument();
    // });

    // it("should render the temperature in the correct unit", () => {
    //     render(
    //         <BrowserRouter>
    //             <CityDetails data={data} unit="metric" forecastData={forecastData} />
    //         </BrowserRouter>
    //     );
    //     const temperature = screen.getByText("20°C");
    //     expect(temperature).toBeInTheDocument();
    //     render(
    //         <BrowserRouter>
    //             <CityDetails data={data} unit="imperial" forecastData={forecastData} />
    //         </BrowserRouter>
    //     );
    //     const temperatureInFahrenheit = screen.getByText("68°F");
    //     expect(temperatureInFahrenheit).toBeInTheDocument();
    // });

    // it("should render the forecast data", () => {
    //     render(
    //         <BrowserRouter>
    //             <CityDetails data={data} unit="metric" forecastData={forecastData} />
    //         </BrowserRouter>
    //     );
    //     const forecastItem = screen.getByText("Cloudy 20°C");
    //     expect(forecastItem).toBeInTheDocument();
    // });
});