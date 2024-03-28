import type { Config } from "tailwindcss";
import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import colorScheme from "./colorScheme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: colorScheme,
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["ph"]),
    }),
  ],
} satisfies Config;
