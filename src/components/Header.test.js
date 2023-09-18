import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";


describe("Header", () => {
    it("should render the search input and add button", () => {
        render(
            <BrowserRouter><Header unit="metric" setUnit={() => { }} setCities={() => { }} /></BrowserRouter>);
        const searchInput = screen.getByPlaceholderText("Add new city");
        expect(searchInput).toBeInTheDocument();
        const addButton = screen.getByTestId("add-button");
        expect(addButton).toBeInTheDocument();
    });

    it("should add a new city when the add button is clicked", () => {
        const setCities = jest.fn();
        render(<BrowserRouter><Header unit="metric" setUnit={() => { }} setCities={setCities} /></BrowserRouter>);
        const searchInput = screen.getByTestId("add-input");
        fireEvent.change(searchInput, { target: { value: "London" } });
        const addButton = screen.getByTestId("add-button");
        fireEvent.click(addButton);
        expect(setCities).toHaveBeenCalled();
    });

    it("should switch the unit when the unit switch is clicked", () => {
        const setUnit = jest.fn();
        render(<BrowserRouter><Header unit="metric" setUnit={setUnit} setCities={() => { }} /></BrowserRouter>);
        const unitSwitch = screen.getByRole("checkbox");
        fireEvent.click(unitSwitch);
        expect(setUnit).toHaveBeenCalled();
    });
});