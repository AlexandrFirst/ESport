import { render, screen } from "@testing-library/react";
import { SportButton } from "@shared/ui/SportButton/SportButton";

describe("SportButton", () => {
  test("Test render", () => {
    render(<SportButton>TEST</SportButton>);
    expect(screen.getByText("TEST")).toBeInTheDocument();
  });
});
