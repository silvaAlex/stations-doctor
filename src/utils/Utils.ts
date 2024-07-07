export const convertToUTCDate = (dataAgendamento: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  const date = new Date(dataAgendamento)
  date.setUTCHours(hours, minutes, 0, 0)
  return date
}
