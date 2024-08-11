module.exports = {
    mode: "jit",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                main: "#FCFDF7",
                body: "#1B4332",
            },
            fontFamily: {
                quicksand: '"Quicksand", Helvetica, Arial, sans-serif',
                playfair: '"Playfair Display", serif',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
