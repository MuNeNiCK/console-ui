import { defineConfig, devices } from "@playwright/test"

const host = "127.0.0.1"
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4321)
const origin = `http://${host}:${port}`

export default defineConfig({
  testDir: "./tests/behavior",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: origin,
    trace: "on-first-retry",
  },
  webServer: {
    command: `pnpm --filter demo dev --host ${host} --port ${port}`,
    url: `${origin}/console-ui/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
