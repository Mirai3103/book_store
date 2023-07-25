/** @type {import('tailwindcss').Config} */
import { tailwindConfig } from "@storefront-ui/react/tailwind-config";
module.exports = {
    presets: [tailwindConfig],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@storefront-ui/react/**/*.{js,mjs}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    25: "#FCFAFF",
                    50: "#F9F5FF",
                    100: "#F4EBFF",
                    200: "#E9D7FE",
                    300: "#D6BBFB",
                    400: "#B692F6",
                    500: "#9E77ED",
                    600: "#7F56D9",
                    700: "#6941C6",
                    800: "#53389E",
                    900: "#42307D",
                },
                secondary: {
                    25: "#F5FAFF",
                    50: "#EFF8FF",
                    100: "#D1E9FF",
                    200: "#B2DDFF",
                    300: "#84CAFF",
                    400: "#53B1FD",
                    500: "#2E90FA",
                    600: "#1570EF",
                    700: "#175CD3",
                    800: "#1849A9",
                    900: "#194185",
                },
            },
        },
    },
    plugins: [],
};
