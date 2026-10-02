import type { Apartment, BookingPreset } from '#shared/types'

interface ModalState {
  apartment: Apartment
  preset: BookingPreset
}

/**
 * Состояние окна бронирования. Заменяет store.modal из Pinia:
 * для одного булева/объекта useState проще и не требует отдельной библиотеки.
 */
export function useBookingModal() {
  const state = useState<ModalState | null>('booking-modal', () => null)

  const open = (apartment: Apartment, preset: BookingPreset = {}) => {
    state.value = { apartment, preset }
  }
  const close = () => {
    state.value = null
  }

  return { state, open, close }
}
