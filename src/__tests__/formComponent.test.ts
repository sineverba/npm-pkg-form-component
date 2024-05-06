import { formComponent } from "../index";

describe("Test formComponent", () => {
  it("Should return null", () => {
    const result = formComponent();
    expect(result).toBeNull();
  });
});
