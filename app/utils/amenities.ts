// Удобства приходят из данных по-русски; здесь — ключ перевода для каждого (i18n: amenity.*).
// Новое удобство без ключа просто покажется как есть.
const keys: Record<string, string> = {
  'Wi-Fi': 'wifi',
  Балкон: 'balcony',
  Джакузи: 'jacuzzi',
  Духовка: 'oven',
  Кондиционер: 'ac',
  Кофемашина: 'coffee',
  Кухня: 'kitchen',
  Парковка: 'parking',
  'Стиральная машина': 'washer',
  Телевизор: 'tv',
  Холодильник: 'fridge',
}

export function useAmenityLabel() {
  const { t } = useI18n()
  return (name: string) => (keys[name] ? t(`amenity.${keys[name]}`) : name)
}
