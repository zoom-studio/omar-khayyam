import { Khayyam, type KhayyamNS } from '..'
import * as testUtils from '../utilities/test-utils'

describe('Khayyam test cases', () => {
  it('should check instance of khayyam', () => {
    const khayyam = new Khayyam()
    expect(khayyam).toBeInstanceOf(Khayyam)
  })

  describe('Date conversion tests', () => {
    const gregorian: KhayyamNS.PossibleDateInput = '2023/6/19'
    const jalali: KhayyamNS.PossibleDateInput = '1402/3/29'
    const islamic: KhayyamNS.PossibleDateInput = '1444/11/30'
    const julian = 2460114.5

    describe('Gregorian date conversion', () => {
      const gregorianDate = new Khayyam('gregorian', gregorian)

      it('should convert [GREGORIAN] to [JALALI]', () => {
        expect(testUtils.outputDateToString(gregorianDate.toJalali())).toBe('1402-3-29 __ 1')
      })
      it('should convert [GREGORIAN] to [ISLAMIC]', () => {
        expect(testUtils.outputDateToString(gregorianDate.toIslamic())).toBe('1444-11-30 __ 1')
      })
      it('should convert [GREGORIAN] to [JULIAN]', () => {
        expect(gregorianDate.toJulianDay()).toBe(julian)
      })
    })

    describe('Jalali date conversion', () => {
      const jalaliDate = new Khayyam('jalali', jalali)

      it('should convert [JALALI] to [GREGORIAN]', () => {
        expect(testUtils.outputDateToString(jalaliDate.toGregorian())).toBe('2023-6-19 __ 1')
      })
      it('should convert [JALALI] to [ISLAMIC]', () => {
        expect(testUtils.outputDateToString(jalaliDate.toIslamic())).toBe('1444-11-30 __ 1')
      })
      it('should convert [JALALI] to [JULIAN]', () => {
        expect(jalaliDate.toJulianDay()).toBe(julian)
      })
    })

    describe('Islamic date conversion', () => {
      const islamicDate = new Khayyam('islamic', islamic)

      it('should convert [ISLAMIC] to [JALALI]', () => {
        expect(testUtils.outputDateToString(islamicDate.toJalali())).toBe('1402-3-29 __ 1')
      })
      it('should convert [ISLAMIC] to [GREGORIAN]', () => {
        expect(testUtils.outputDateToString(islamicDate.toGregorian())).toBe('2023-6-19 __ 1')
      })
      it('should convert [ISLAMIC] to [JULIAN]', () => {
        expect(islamicDate.toJulianDay()).toBe(julian)
      })
    })
  })

  it('should correctly detect leap years base on the given calendar', () => {
    expect(new Khayyam('gregorian', '2024/1/1').isLeapYear).toBe(true)
    expect(new Khayyam('gregorian', '2023/1/1').isLeapYear).toBe(false)
    expect(new Khayyam('jalali', '1404/1/1').isLeapYear).toBe(true)
    expect(new Khayyam('jalali', '1403/1/1').isLeapYear).toBe(false)
    expect(new Khayyam('islamic', '1445/1/1').isLeapYear).toBe(true)
    expect(new Khayyam('islamic', '1444/1/1').isLeapYear).toBe(false)
  })
})
