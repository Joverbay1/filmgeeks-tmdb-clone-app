import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { worker } from "../mocks/browser";
import CardGrid from "./CardGrid";

// Start the service worker before all tests
beforeAll(() => worker.start());

// Reset any runtime request handlers after each test
afterEach(() => worker.resetHandlers());

// Stop the service worker after all tests
afterAll(() => worker.stop());

describe("CardGrid", () => {
  test("loads and displays the movie data", async () => {
    render(
      <Provider store={store}>
        <CardGrid />
      </Provider>
    );
    const movieTitle = await screen.findByText(/sample movie/i); // Use a case-insensitive regex to match the movie title
    expect(movieTitle).toBeInTheDocument();
  });
});
