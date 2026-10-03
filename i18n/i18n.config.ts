// Русские окончания: 1 ночь / 2 ночи / 5 ночей. В казахском после числа слово не меняется — одна форма.
function russianPlural(choice: number, choicesLength: number) {
  const n = Math.abs(choice)
  const mod10 = n % 10
  const mod100 = n % 100
  let index = 2
  if (mod10 === 1 && mod100 !== 11) index = 0
  else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) index = 1
  return Math.min(index, choicesLength - 1)
}

export default defineI18nConfig(() => ({
  fallbackLocale: 'ru',
  pluralRules: {
    ru: russianPlural,
    kk: () => 0,
  },
}))
