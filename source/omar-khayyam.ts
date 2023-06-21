import { type KhayyamNS } from './types'
import * as utils from './utilities'

export class Khayyam {
  private readonly _calendar!: KhayyamNS.Calendars
  private readonly _date!: KhayyamNS.DateOutput

  constructor()
  constructor(calendar: KhayyamNS.Calendars)
  constructor(calendar: KhayyamNS.Calendars, date: KhayyamNS.PossibleDateInput)
  constructor(calendar?: KhayyamNS.Calendars, date?: KhayyamNS.PossibleDateInput) {
    calendar = calendar ?? 'gregorian'
    date = utils.dateInputToOutput(date ?? new Date())

    this._calendar = calendar

    switch (this._calendar) {
      case 'gregorian': {
        this._date = this._toGregorian({ ...date, weekDay: 0 }, calendar)
        break
      }
      case 'islamic': {
        this._date = this._toIslamic({ ...date, weekDay: 0 }, calendar)
        break
      }
      case 'jalali': {
        this._date = this._toJalali({ ...date, weekDay: 0 }, calendar)
        break
      }
    }
  }

  private readonly _getCalendarEpoch = (calendar: KhayyamNS.Calendars): number => {
    switch (calendar) {
      case 'gregorian':
        return 1721425.5
      case 'islamic':
        return 1948439.5
      case 'jalali':
        return 1948320.5
    }
  }

  private readonly _getJulianWeekDay = (julianDay: number) => {
    return utils.modulus(Math.floor(julianDay + 1.5), 7)
  }

  private readonly _isLeapYear = (year: number, calendar: KhayyamNS.Calendars) => {
    switch (calendar) {
      case 'gregorian':
        return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0)
      case 'jalali':
        return ((((year - (year > 0 ? 474 : 473)) % 2820) + 474 + 38) * 682) % 2816 < 682
      case 'islamic':
        return (year * 11 + 14) % 30 < 11
    }
  }

  private readonly _toJulianDate = (
    date: KhayyamNS.DateOutput,
    calendar: KhayyamNS.Calendars,
  ): number => {
    const { year, month, day } = date

    switch (calendar) {
      case 'jalali': {
        const base = year - (year >= 0 ? 474 : 473)
        const epYear = 474 + utils.modulus(base, 2820)
        return (
          day +
          (month <= 7 ? (month - 1) * 31 : (month - 1) * 30 + 6) +
          Math.floor((epYear * 682 - 110) / 2816) +
          (epYear - 1) * 365 +
          Math.floor(base / 2820) * 1029983 +
          (this._getCalendarEpoch('jalali') - 1)
        )
      }
      case 'gregorian': {
        return (
          this._getCalendarEpoch('gregorian') -
          1 +
          365 * (year - 1) +
          Math.floor((year - 1) / 4) +
          -Math.floor((year - 1) / 100) +
          Math.floor((year - 1) / 400) +
          Math.floor(
            (367 * month - 362) / 12 +
              (month <= 2 ? 0 : this._isLeapYear(year, calendar) ? -1 : -2) +
              day,
          )
        )
      }
      case 'islamic': {
        return (
          day +
          Math.ceil(29.5 * (month - 1)) +
          (year - 1) * 354 +
          Math.floor((3 + 11 * year) / 30) +
          this._getCalendarEpoch('islamic') -
          1
        )
      }
    }
  }

  private readonly _toGregorian = (
    date: KhayyamNS.DateOutput,
    calendar: KhayyamNS.Calendars,
  ): KhayyamNS.DateOutput => {
    let year
    const jd = this._toJulianDate(date, calendar)
    const weekDay = this._getJulianWeekDay(jd)
    const wjd = Math.floor(jd - 0.5) + 0.5
    const epoch = wjd - this._getCalendarEpoch('gregorian')
    const quadrangle = Math.floor(epoch / 146097)
    const dqc = utils.modulus(epoch, 146097)
    const cent = Math.floor(dqc / 36524)
    const dCent = utils.modulus(dqc, 36524)
    const quad = Math.floor(dCent / 1461)
    const dQuad = utils.modulus(dCent, 1461)
    const yearIndex = Math.floor(dQuad / 365)
    year = quadrangle * 400 + cent * 100 + quad * 4 + yearIndex
    if (!(cent === 4 || yearIndex === 4)) {
      year++
    }
    const gregorianDate: KhayyamNS.DateOutput = { year, month: 1, day: 1, weekDay: 0 }
    const dayInYear = wjd - this._toJulianDate(gregorianDate, 'gregorian')
    gregorianDate.month = 3
    const julianLeap =
      wjd < this._toJulianDate(gregorianDate, 'gregorian')
        ? 0
        : this._isLeapYear(year, 'gregorian')
        ? 1
        : 2
    const month = Math.floor(((dayInYear + julianLeap) * 12 + 373) / 367)
    gregorianDate.month = month
    const day = wjd - this._toJulianDate(gregorianDate, 'gregorian') + 1
    gregorianDate.day = day
    gregorianDate.weekDay = weekDay
    return gregorianDate
  }

  private readonly _toJalali = (
    date: KhayyamNS.DateOutput,
    calendar: KhayyamNS.Calendars,
  ): KhayyamNS.DateOutput => {
    let julianDay =
      this._toJulianDate(date, calendar) + Math.floor(0 + 60 * (0 + 60 * 0) + 0.5) / 86400.0
    const weekDay = this._getJulianWeekDay(julianDay)
    julianDay = Math.floor(julianDay) + 0.5
    const jalaliDate: KhayyamNS.DateOutput = { year: 475, month: 1, day: 1, weekDay: 0 }

    const epoch = julianDay - this._toJulianDate(jalaliDate, 'jalali')
    const cycle = Math.floor(epoch / 1029983)
    const cYear = utils.modulus(epoch, 1029983)
    let yearCycle = 0

    if (cYear === 1029982) {
      yearCycle = 2820
    } else {
      const aux1 = Math.floor(cYear / 366)
      const aux2 = utils.modulus(cYear, 366)
      yearCycle = Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522) + aux1 + 1
    }
    let year = yearCycle + 2820 * cycle + 474

    if (year <= 0) {
      year--
    }

    jalaliDate.year = year
    const yDay = julianDay - this._toJulianDate(jalaliDate, 'jalali') + 1
    const month = yDay <= 186 ? Math.ceil(yDay / 31) : Math.ceil((yDay - 6) / 30)

    jalaliDate.month = month
    const day = julianDay - this._toJulianDate(jalaliDate, 'jalali') + 1

    jalaliDate.day = day
    jalaliDate.weekDay = weekDay

    return jalaliDate
  }

  private readonly _toIslamic = (
    date: KhayyamNS.DateOutput,
    calendar: KhayyamNS.Calendars,
  ): KhayyamNS.DateOutput => {
    const julianDate = Math.floor(this._toJulianDate(date, calendar)) + 0.5
    const islamicDate: KhayyamNS.DateOutput = {
      year: Math.floor((30 * (julianDate - this._getCalendarEpoch('islamic')) + 10646) / 10631),
      month: 1,
      day: 1,
      weekDay: 0,
    }
    islamicDate.month = Math.min(
      12,
      Math.ceil((julianDate - (29 + this._toJulianDate(islamicDate, 'islamic'))) / 29.5) + 1,
    )
    islamicDate.day = julianDate - this._toJulianDate(islamicDate, 'islamic') + 1
    islamicDate.weekDay = this._getJulianWeekDay(julianDate)
    return islamicDate
  }

  toJalali = () => {
    return new Khayyam('jalali', this._toJalali(this._date, this._calendar))
  }

  toGregorian = () => {
    return new Khayyam('gregorian', this._toGregorian(this._date, this._calendar))
  }

  toIslamic = () => {
    return new Khayyam('islamic', this._toIslamic(this._date, this._calendar))
  }

  toJulianDay = () => {
    return this._toJulianDate(this._date, this._calendar)
  }

  get date(): KhayyamNS.DateOutput {
    return this._date
  }

  get isLeapYear(): boolean {
    return this._isLeapYear(this._date.year, this._calendar)
  }
}
