export const getHourAndMinute = (date: string | Date): string => {
  const time = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }
  return time.toLocaleTimeString('pt-BR', options)
}
