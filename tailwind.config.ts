import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-dark-purple": "#09092f"
      },
      backgroundImage: {
        starshopBackground: "url('/background-image-starshop.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
