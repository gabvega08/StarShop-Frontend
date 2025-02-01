import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/home.jsx";

test("renders homepage", () => {
  render(<Home />);
  expect(screen.getByText("Welcome to Next.js!")).toBeInTheDocument();
});
