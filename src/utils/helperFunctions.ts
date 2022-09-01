export const getDayOfWeek = (date: Date): string => {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return weekday[date.getDay()]
}
