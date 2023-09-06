/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'xs': '340px',
            // => @media (min-width: 640px) { ... }

            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        mode: 'jit',
        extend: {
            colors: {
                'brown-1': '#525252',
                'green-2': '#0A7D7D',
                'green-3': '#025B5B',
                'green-4': '#044A54',
                'green-5': '#3C9A9A',
                'green-6': '#044A54',
                'green-7': '#0F6F6F',
                'orange-1': '#F7B618',
                'yellow-1': '#FBD987',
                'yellow-2': '#F7B618',
                'yellow-3': '#FBA919',
                'yellow-4': '#F2B41A',
                'home-base': '#F5F5F5',
                'home-header': '#FFFFFF',
                'division': '#E5C67C',
                'pen1': '#0074C8',
                'pen2': '#F7B618',
                'pen3': '#045B5C',
                'pen4': '#FFD05E',
                'pen5': '#B72020',
                'pen6': '#AB27AD',
                'pen7': '#671C1C',
                'pen8': '#273CAD',
                'pen9': '#040303',
                'pen10': '#FF749E',
                'pen11': '#9D9D9D',
                'pen12': '#658F3B',
                'pen13': '#67A4FF',
                'pen14': '#FF5C00',
                'pen15': '#5BCE00',
            },
            spacing: {
                '128': 'rem',
                '5%': '5%',
                '8%': '8%',
                '10%': '10%',
                '12%': '12%',
                '15%': '15%',
                '20%': '20%',
                '25%': '25%',
                '30%': '30%',
                '35%': '35%',
                '40%': '40%',
                '42%': '42%',
                '45%': '45%',
                '55%': '55%',
                '75%': '75%',
                '80%': '80%',
                '82%': '82%',
                '85%': '85%',
                '88%': '88%',
                '90%': '90%',
                '92%': '92%',
                '95%': '95%',
            },
            fontSize: {
                'xxs': '.5rem',
                'xs': '.6rem',
            },

            fontFamily: {
                // 'nunito': ['Nunito', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],

            },
            keyframes: {
                step1: {
                    '0%': { transform: 'rotate(0.0deg)' },
                    '100%': { transform: 'rotate(90.0deg)' },
                },
            },
            animation: {
                'wheel1to2': 'spin1to2 4s ease-in-out 1',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwind-scrollbar-hide')
    ],
}
