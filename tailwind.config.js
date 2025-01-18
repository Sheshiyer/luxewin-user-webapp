/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
