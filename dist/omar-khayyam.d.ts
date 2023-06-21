import { type KhayyamNS } from './types';
export declare class Khayyam {
    private readonly _calendar;
    private readonly _date;
    constructor();
    constructor(calendar: KhayyamNS.Calendars);
    constructor(calendar: KhayyamNS.Calendars, date: KhayyamNS.PossibleDateInput);
    private readonly _getCalendarEpoch;
    private readonly _getJulianWeekDay;
    private readonly _isLeapYear;
    private readonly _toJulianDate;
    private readonly _toGregorian;
    private readonly _toJalali;
    private readonly _toIslamic;
    toJalali: () => KhayyamNS.DateOutput;
    toGregorian: () => KhayyamNS.DateOutput;
    toIslamic: () => KhayyamNS.DateOutput;
    toJulianDay: () => number;
    get date(): KhayyamNS.DateOutput;
    get isLeapYear(): boolean;
}
