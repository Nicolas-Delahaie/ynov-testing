import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["./**/*.test.ts"],
    exclude: ["**/*cli.ts"],
    coverage: {
      enabled: true,
      reporter: ["text"],
    },
  },
});
