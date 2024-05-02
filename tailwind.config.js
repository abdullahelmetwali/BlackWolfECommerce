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
        },
        moveIn: {
          '0%': { opacity: 0, transform: 'translate3d(-50%, 15px, -45%)' },
          '100%': { opacity: 1, transform: 'translate3d(-50%, 10px, -50%)' }
        }
      },
      animation: {
        slide: 'slide 30s linear 0s infinite normal',
        moveIn: 'moveIn 4s ease 0s both'
      }
    }
  },
  plugins: []
}
