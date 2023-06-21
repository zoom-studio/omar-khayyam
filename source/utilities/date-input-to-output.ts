import type { KhayyamNS } from '../types'
import { dateToDateOutput } from './date-to-date-output'

export const dateInputToOutput = (dateInput: KhayyamNS.PossibleDateInput): KhayyamNS.DateOutput => {
  if (dateInput instanceof Date) {
    return dateToDateOutput(dateInput)
  }

  if (typeof dateInput === 'number' || typeof dateInput === 'string') {
    const date = new Date(dateInput)
    return dateToDateOutput(date)
  }

  if ('year' in dateInput) {
    return { ...dateInput, weekDay: 0 }
  }

  const [year, month, day, weekDay] = dateInput.map(Number)
  return { year, month, day, weekDay: weekDay ?? 0 }
}
