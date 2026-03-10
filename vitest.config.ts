import { defineConfig } from "vitest/config";
import { resolve } from "path";

const root = (pkg: string) => resolve(__dirname, `packages/${pkg}`);

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "cli",
          root: root("cli"),
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "core",
          root: root("core"),
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "components",
          root: root("components"),
          environment: "jsdom",
          globals: true,
          include: ["src/**/*.test.tsx"],
          setupFiles: [resolve(root("components"), "src/test-setup.ts")],
        },
      },
      {
        extends: true,
        test: {
          name: "theme",
          root: root("theme"),
          environment: "jsdom",
          globals: true,
          include: ["src/**/*.test.tsx", "src/**/*.test.ts"],
          setupFiles: [resolve(root("theme"), "src/test-setup.ts")],
        },
      },
      {
        extends: true,
        test: {
          name: "landing",
          root: root("landing"),
          environment: "jsdom",
          globals: true,
          include: ["src/**/*.test.tsx"],
          setupFiles: [resolve(root("landing"), "src/test-setup.ts")],
        },
      },
      {
        extends: true,
        test: {
          name: "api",
          root: root("api"),
          environment: "node",
          include: ["src/**/*.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "dashboard",
          root: root("dashboard"),
          environment: "jsdom",
          globals: true,
          include: ["src/**/*.test.tsx"],
          setupFiles: [resolve(root("dashboard"), "src/test-setup.ts")],
        },
      },
    ],
  },
});
