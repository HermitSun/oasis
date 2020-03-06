import { isMobile, isPC } from "@/utils/breakpoint";

describe("Breakpoint Util", () => {
  it("can use", () => {
    expect(isMobile()).not.toBeUndefined();
    expect(isPC()).not.toBeUndefined();
  });
});
