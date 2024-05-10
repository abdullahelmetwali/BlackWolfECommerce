/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*'],
  theme: {
    extend: {
      screens: {
        tab: { max: '1000px' },
        mob: { max: '767px' }
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        slide: 'slide 30s linear 0s infinite normal'
      }
    }
  },
  plugins: []
}
