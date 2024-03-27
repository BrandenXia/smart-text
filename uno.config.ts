import { defineConfig, presetIcons, presetUno } from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      include: ["./index.html", "./src/**/*.{ts,tsx}"],
    },
  },
  presets: [presetUno(), presetIcons()],
});
