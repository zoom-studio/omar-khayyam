import * as utils from '../utilities'
import type { KhayyamNS } from '../types'
import { Khayyam } from '../omar-khayyam'
import * as testUtils from '../utilities/test-utils'

describe('Utilities test cases', () => {
  it('should return correct value of modulus calculation', () => {
    expect(utils.modulus(5, 5)).toBe(0)
    expect(utils.modulus(5, 10)).toBe(5)
    expect(utils.modulus(10, 5)).toBe(0)
  })

  it('should convert Date instance to KhayyamNS.DateOutput format', () => {
    const date = new Date('2023-05-04')
    expect(utils.dateToDateOutput(date)).toEqual<KhayyamNS.DateOutput>({
      year: 2023,
      month: 5,
      day: 4,
      weekDay: 4,
    })
  })

  it('should convert PossibleDateInput to DateOutput', () => {
    const date1: KhayyamNS.PossibleDateInput = new Date('2023-05-04')
    const date2: KhayyamNS.PossibleDateInput = '2023-05-04'
    const date3: KhayyamNS.PossibleDateInput = '2023/05/04'
    const date4: KhayyamNS.PossibleDateInput = 1683145800000
    const date5: KhayyamNS.PossibleDateInput = { year: 2023, month: 5, day: 4 }
    const date6: KhayyamNS.PossibleDateInput = [2023, 5, 4]
    const date7: KhayyamNS.PossibleDateInput = ['2023', '5', '4']

    const expectedDate: Omit<KhayyamNS.DateOutput, 'weekDay'> = { year: 2023, month: 5, day: 4 }

    expect(utils.dateInputToOutput(date1)).toEqual({ ...expectedDate, weekDay: 4 })
    expect(utils.dateInputToOutput(date2)).toEqual({ ...expectedDate, weekDay: 4 })
    expect(utils.dateInputToOutput(date3)).toEqual({ ...expectedDate, weekDay: 4 })
    expect(utils.dateInputToOutput(date4)).toEqual({ ...expectedDate, weekDay: 4 })
    expect(utils.dateInputToOutput(date5)).toEqual({ ...expectedDate, weekDay: 0 })
    expect(utils.dateInputToOutput(date6)).toEqual({ ...expectedDate, weekDay: 0 })
    expect(utils.dateInputToOutput(date7)).toEqual({ ...expectedDate, weekDay: 0 })
  })

  it('should convert OutputDate to string', () => {
    const khayyam = new Khayyam('gregorian', '2023/6/19')
    expect(testUtils.outputDateToString(khayyam.date)).toBe('2023-6-19 __ 1')
  })
})
