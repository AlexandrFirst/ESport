import { render, screen } from "@testing-library/react";

import { UserAvatar } from "@entities/user";

describe("UserAvatar", () => {
  test("Test render", () => {
    render(<UserAvatar />);
    expect(screen.getByTestId("user-avatar-test")).toBeInTheDocument();
  });
});
