/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color_1': '#E0E0E0',
        'color_2': '#C5C5C5',
        'color_3': '#6A6C6A',
        'color_4': '#5A5C5A',
        'color_5': '#424242',
        'color_6': '#1A8251',
        'color_7': '#931515'
      },
      backgroundImage: {
        'logo': "url('../src/assets/img/logo_gray.svg')",
        'logoDynamic': "url('../src/assets/img/logo_dynamics.svg')",
        'user': "url('../src/assets/img/user.svg')",
        'download': "url('../src/assets/img/download.svg')",
        'plusCircle': "url('../src/assets/img/plus_circle.svg')",
        'negativeCircle': "url('../src/assets/img/negative.svg')",
        'dots': "url('../src/assets/img/dots.svg')",
        'publish': "url('../src/assets/img/publish.svg')",
        'check': "url('../src/assets/img/check.svg')",
        'error': "url('../src/assets/img/error.svg')",
        'modelLandingPageNormal1': "url('../src/assets/img/model_landing_page_normal_1.svg')",
        'modelLandingPageNormal2': "url('../src/assets/img/model_landing_page_normal_2.svg')",
        'modelLandingPageNormal3': "url('../src/assets/img/model_landing_page_normal_3.svg')",
        'modelLandingPageActive1': "url('../src/assets/img/model_landing_page_active_1.svg')",
        'modelLandingPageActive2': "url('../src/assets/img/model_landing_page_active_2.svg')",
        'modelLandingPageActive3': "url('../src/assets/img/model_landing_page_active_3.svg')",
        'arrowDown': "url('../src/assets/img/arrow_down.svg')",
        'plus': "url('../src/assets/img/plus.svg')",
        'close': "url('../src/assets/img/close.svg')",
        'calendar': "url('../src/assets/img/calendar.svg')",
        'warning': "url('../src/assets/img/warning.svg')",
        'downArrow': "url('../src/assets/img/down_arrow.svg')",
        'facebook': "url('../src/assets/img/facebook.svg')",
        'instagram': "url('../src/assets/img/instagram.svg')",
        'pencil': "url('../src/assets/img/pencil.svg')",
      }
    },
  },
  plugins: [],
}
