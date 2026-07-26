import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:3001/api-docs-json",
    output: {
      target: "./src/generated/api.ts",
      client: "react-query",
      httpClient: "fetch",
      baseUrl: "http://localhost:3001",
    },
  },
});
