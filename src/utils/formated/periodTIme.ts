export const periodTime = (beginAt: string | Date, endAt?: string | Date) => {
  const begin = new Date(beginAt)
  const end = new Date(endAt ?? beginAt)
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  return `${begin.toLocaleTimeString('pt-BR', options)} - ${endAt ? end.toLocaleTimeString('pt-BR', options) : 'Vazio'}`
}
