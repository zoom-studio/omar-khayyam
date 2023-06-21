export declare namespace KhayyamNS {
    type Calendars = (typeof Calendars)[number];
    const Calendars: readonly ["jalali", "islamic", "gregorian"];
    interface DateOutput {
        year: number;
        month: number;
        day: number;
        weekDay: number;
    }
    type PossibleDateInput = Date | string | number | Omit<DateOutput, 'weekDay'> | [string | number, string | number, string | number];
}
