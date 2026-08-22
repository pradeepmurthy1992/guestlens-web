import { describe, it, expect } from "vitest";
import { slugify, isRevealed } from "./eventService";

describe("slugify", () => {
  it("lowercases and hyphenates names", () => {
    expect(slugify("Priya", "Akash")).toMatch(/^priya-akash-[a-z0-9]{4}$/);
  });

  it("strips characters that aren't letters, numbers or spaces", () => {
    expect(slugify("Priya!", "O'Brien")).toMatch(/^priya-obrien-[a-z0-9]{4}$/);
  });

  it("collapses internal whitespace into single hyphens", () => {
    expect(slugify("Priya Rao", "Akash Kumar")).toMatch(
      /^priya-rao-akash-kumar-[a-z0-9]{4}$/
    );
  });

  it("appends a different random suffix each call, so two events never collide", () => {
    const a = slugify("Priya", "Akash");
    const b = slugify("Priya", "Akash");
    expect(a).not.toBe(b);
  });
});

describe("isRevealed", () => {
  it("is revealed when there's no reveal_date at all", () => {
    expect(isRevealed({ reveal_date: null })).toBe(true);
  });

  it("is not revealed when reveal_date is in the future", () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    expect(isRevealed({ reveal_date: future.toISOString().slice(0, 10) })).toBe(false);
  });

  it("is revealed when reveal_date is in the past", () => {
    const past = new Date();
    past.setFullYear(past.getFullYear() - 1);
    expect(isRevealed({ reveal_date: past.toISOString().slice(0, 10) })).toBe(true);
  });

  it("is revealed on the reveal_date itself, not just after it", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(isRevealed({ reveal_date: today })).toBe(true);
  });
});
