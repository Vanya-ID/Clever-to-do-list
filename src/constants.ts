export const CURRENT_YEAR = new Date().getFullYear()
export const TODAY = new Date().getDate()
export const LIST_OF_WEEKDAYS = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wen: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
}
export const LIST_OF_MONTHS = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
}

type MonthsNameType =
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'August'
    | 'September'
    | 'October'
    | 'November'
    | 'December'

export const findMonthName = (monthNum: number) => {
    return Object.keys(LIST_OF_MONTHS).find(
        (m) => LIST_OF_MONTHS[m as MonthsNameType] === monthNum
    )
}
