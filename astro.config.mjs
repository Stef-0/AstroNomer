import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";
import instanceConfig from "./instance.config.mjs";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const site = env.PUBLIC_SITE_URL || "https://example.com";
const base = instanceConfig.mount.basePath || "/";

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "never",
  integrations: [
    mdx(),
    sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark",
      wrap: true
    }
  },
  scopedStyleStrategy: "where"
});
