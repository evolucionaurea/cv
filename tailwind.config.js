/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
            colors: { ink: { 950: '#060b14', 900: '#0a1220', 800: '#0f1a2c', 700: '#152238' } }
        }
    }
};

