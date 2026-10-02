import type { Config } from 'tailwindcss'

// Палитра взята из логотипа: пыльная роза («GOOD»), стальная синева (дверь), глубокий бирюзовый («HOME»).
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        paper: '#FBFAF8', // фон страницы: тёплый белый
        ink: '#24343B', // основной текст: глубокий сине-серый вместо чёрного
        muted: '#5F7078', // вторичный текст
        line: '#E4E9EC', // тонкие линии
        mist: '#EEF3F6', // лёгкая подложка
        brand: { DEFAULT: '#287888', dark: '#1E6270', soft: '#E3EFF2' }, // «HOME» из логотипа
        steel: '#7898B0', // дверь из логотипа (только декор)
        rose: { DEFAULT: '#B8988F', soft: '#F5EEEB' }, // «GOOD» из логотипа (только декор: на белом контраст низкий)
      },
      fontFamily: {
        sans: ['Jost', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
}
