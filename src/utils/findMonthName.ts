import {LIST_OF_MONTHS, MonthsNameType} from "../constants";

export const findMonthName = (monthNum: number) => {
    return Object.keys(LIST_OF_MONTHS).find(
        (m) => LIST_OF_MONTHS[m as MonthsNameType] === monthNum
    )
}