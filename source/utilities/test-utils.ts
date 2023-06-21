import type { KhayyamNS } from '../types'

export const outputDateToString = (outputDate: KhayyamNS.DateOutput): string => {
  const { year, month, day, weekDay } = outputDate
  return `${year}-${month}-${day} __ ${weekDay}`
}
