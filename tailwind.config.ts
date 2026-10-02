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
        // дверь из логотипа: DEFAULT — только декор (3:1 на белом), dark — можно для текста и иконок (4.5:1)
        steel: { DEFAULT: '#7898B0', dark: '#5A7A93' },
        // «GOOD» из логотипа — тёплый второй акцент: DEFAULT только декор (2.6:1), dark — для текста и иконок (4.6:1)
        rose: { DEFAULT: '#B8988F', dark: '#8E6E65', soft: '#F5EEEB' },
      },
      fontFamily: {
        sans: ['Jost', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
}
