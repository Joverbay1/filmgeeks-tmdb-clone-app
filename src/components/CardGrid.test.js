import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { worker } from "../mocks/browser";
import CardGrid from "./CardGrid";

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

describe("CardGrid", () => {
  test("loads and displays the movie data", async () => {
    render(
      <Provider store={store}>
        <CardGrid />
      </Provider>
    );
    const movieTitle = await screen.findByText("Sample Movie");
    expect(movieTitle).toBeInTheDocument();
  });
});
