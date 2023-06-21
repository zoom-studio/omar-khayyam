# Khayyam 🪐 🏛

A _zero-dependency_ _lightweight_ date conversion library for most popular calendars [**Jalali**, **Gregorian**, **Islamic**]

![omar-khayyam](docs/omar-khayyam.jpg)

## Who is _**Omar Khayyam**_?

He was an Iranian polymath, known for his contributions to mathematics, **astronomy**, philosophy, and poetry.
He was commissioned to build an observatory at Isfahan and reform the Persian calendar. Finally, the Jalali calendar was created by him as the most accurate calculated calendar.
[Read more about Omar Khayyam at Wikipedia](https://en.wikipedia.org/wiki/Omar_Khayyam)

---

## What is _**Khayyam**_?

This is a JavaScript library written in TypeScript. Using this library, you can convert Jalali, Gregorian and Islamic dates to each other.

> Khayyam is released under the [MIT license](https://github.com/zoom-studio/omar-khayyam/blob/main/LICENSE) & supports modern environments.

# Installation

```bash
# Yarn users
yarn add omar-khayyam

# NPM users
npm i omar-khayyam

# PNPM users
pnpm add omar-khayyam
```

# Date conversion usage

```js
import { Khayyam } from 'omar-khayyam'

const gregorian = new Khayyam('gregorian', '2023-6-19')
const jalali = new Khayyam('jalali', '1402-3-29')
const islamic = new Khayyam('islamic', '1444-11-30')

const gregoryToJalali = gregorian.toJalali().date
const islamicToJalali = islamic.toJalali().date
// { year: 1444, month: 11, day: 30, weekDay: 1 }

const gregoryToIslamic = gregorian.toIslamic().date
const jalaliToIslamic = jalali.toIslamic().date
// { year: 1402, month: 3, day: 29, weekDay: 1 }

const jalaliToGregory = jalali.toGregorian().date
const islamicToGregory = islamic.toGregorian().date
// { year: 2023, month: 6, day: 19, weekDay: 1 }

const gregoryToJulian = gregorian.toJulianDay()
const jalaliToJulian = gregorian.toJulianDay()
const islamicToJulian = gregorian.toJulianDay()
// 2460114.5
```

# Date utilities usage
> Currently only one additional date util is provided. Wait for future releases :)

### 1. Leap year detection
```js
import { Khayyam } from 'omar-khayyam'

const gregorian = new Khayyam('gregorian', '2024-1-1')
const jalali = new Khayyam('jalali', '1402-1-1')
const islamic = new Khayyam('islamic', '1445-1-1')

gregorian.isLeapYear // true
jalali.isLeapYear // false
islamic.isLeapYear // true
```
