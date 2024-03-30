import type { Config } from "tailwindcss";
import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import colorScheme from "./colorScheme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: colorScheme,
    extend: {
      listStyleType: {
        "upper-alpha": "upper-alpha",
        "lower-alpha": "lower-alpha",
        "upper-roman": "upper-roman",
        "lower-roman": "lower-roman",
        revert: "revert",
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["ph"]),
    }),
  ],
} satisfies Config;
