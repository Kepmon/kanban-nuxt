export const closeOnEsc = (e: KeyboardEvent, callback: () => void) => {
  if (e.key !== 'Escape') return

  callback()
}
