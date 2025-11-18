import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run server",
    port: 3000,
  },
  use: {
    headless: true,
    // 会社 PC は拡張機能オフで起動できない
    launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
  },
  testDir: ".",
  testMatch: /(.+\.)?spec\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});

// import { defineConfig } from "@playwright/test";

// export default defineConfig({
// testDir: ".",
// testMatch: /(.+\.)?spec\.[jt]s/,

// use: {
// headless: true,
// launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
// baseURL: "[http://localhost:3000](http://localhost:3000/)",
// },

// webServer: {
// command: "npx http-server . -p 3000",
// port: 3000,
// reuseExistingServer: true,
// },

// workers: 1,
// maxFailures: 1,
// });
