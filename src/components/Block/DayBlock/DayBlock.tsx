import React from 'react'
import { CURRENT_YEAR, LIST_OF_WEEKDAYS, TODAY } from '../../../constants'

import s from './DayBlock.module.scss'

type DayBlockPropsType = {
    date: string
    setDayNumber: (day: number) => void
    selectedDay: number
    month: number
    userId: string
    redPin: boolean
    greenPin: boolean
}

type WeekType = 'Sun' | 'Mon' | 'Tue' | 'Wen' | 'Thu' | 'Fri' | 'Sat'

const DayBlock: React.FC<DayBlockPropsType> = React.memo((props) => {
    const { date, setDayNumber, month, redPin, greenPin, selectedDay } = props

    const monthDay = +date.slice(-2)

    const weekDay = new Date(CURRENT_YEAR, month - 1, monthDay).getDay()

    const findWeekDay = (value: number) =>
        Object.keys(LIST_OF_WEEKDAYS).filter(
            (key) => LIST_OF_WEEKDAYS[key as WeekType] === value
        )

    return (
        <div
            onClick={() => setDayNumber(monthDay)}
            className={s.dayBlockWrapper}
        >
            <div
                className={
                    monthDay === selectedDay
                        ? `${s.one_day_block} ${s.selected}`
                        : monthDay === TODAY
                        ? `${s.one_day_block} ${s.today_block}`
                        : `${s.one_day_block}`
                }
            >
                <span>{findWeekDay(weekDay)}</span>
                <span>{monthDay}</span>
            </div>
            <div className={s.wrapper}>
                {greenPin && (
                    <>
                        <span className={s.green} />
                    </>
                )}
                {redPin && <span className={s.red} />}
            </div>
        </div>
    )
})

export default DayBlock
