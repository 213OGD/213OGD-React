// tailwind.config.js
const colors = require('tailwindcss/colors');
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Open Sans', 'sans-serif'],
            heading: ['PT Sans', 'sans-serif'],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            cyan: colors.cyan,
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            blue: colors.blue,
            green: colors.emerald,
        },
        extend: {
            screens: {
                '3xl': '1920px',
                '4xl': '2460px',
                '5xl': '3840px',
            },
            backgroundImage: (theme) => ({
                wild: "url('./images/bg-wild.jpeg')",
            }),
            animation: {
                'spin-r': 'spin-r 1s ease-in-out',
            },
            keyframes: {
                'spin-r': {
                    'from': {
                        transform: 'rotate(360deg)'
                    },
                    'to': {
                        transform: 'rotate(0deg)'
                    },
                }
            },
        },
    },
    variants: {
        neumorphismFlat: ['responsive', 'hover', 'visited', 'checked'],
        neumorphismConcave: ['responsive', 'hover', 'visited', 'checked'],
        neumorphismConvex: ['responsive', 'hover', 'visited', 'checked'],
        neumorphismInset: ['focus', 'active', 'visited', 'checked'],
        extend: {
            animation: [
                'group-hover',
                'hover',
                'focus',
                'motion-safe',
                'motion-reduce',
                'active',
                'checked',
            ],
        },
    },
    plugins: [require('tailwindcss-neumorphism')],
};
