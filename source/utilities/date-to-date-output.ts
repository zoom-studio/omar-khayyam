import type { KhayyamNS } from '../types'

export const dateToDateOutput = (date: Date): KhayyamNS.DateOutput => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekDay: date.getDay(),
  }
}
