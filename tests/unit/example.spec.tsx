import { render, screen } from "@testing-library/react";

function Hello() { return <h1>Hello</h1>; }

it("renders", () => {
  render(<Hello />);
  expect(screen.getByText("Hello")).toBeInTheDocument();
});