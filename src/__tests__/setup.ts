import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

/* jsdom does not implement layout methods — mock them */
Element.prototype.scrollIntoView = vi.fn();
