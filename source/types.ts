export namespace KhayyamNS {
  export type Calendars = (typeof Calendars)[number]
  export const Calendars = ['jalali', 'islamic', 'gregorian'] as const

  export interface DateOutput {
    year: number
    month: number
    day: number
    weekDay: number
  }

  export type PossibleDateInput =
    | Date
    | string
    | number
    | Omit<DateOutput, 'weekDay'>
    | [string | number, string | number, string | number]
}
