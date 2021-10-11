import React, {useCallback} from 'react'
import {CURRENT_YEAR, LIST_OF_WEEKDAYS, TODAY} from '../../constants'

import s from './DayBlock.module.scss'
import {DayBlockPropsType, WeekType} from "./DayBlock.type";


const DayBlock: React.FC<DayBlockPropsType> = React.memo(({
                                                              date,
                                                              setDayNumber,
                                                              month,
                                                              redPin,
                                                              greenPin,
                                                              selectedDay
                                                          }) => {

    const monthDay = +date.slice(-2)

    const weekDay = new Date(CURRENT_YEAR, month - 1, monthDay).getDay()

    const setClassName = useCallback(() => {
        if (monthDay === selectedDay) {
            return `${s.one_day_block} ${s.selected}`
        }
        if (monthDay === TODAY) {
            return `${s.one_day_block} ${s.today_block}`
        } else {
            return `${s.one_day_block}`
        }
    }, [monthDay, selectedDay])

    const findWeekDay = useCallback((value: number) =>
        Object.keys(LIST_OF_WEEKDAYS).filter(
            (key) => LIST_OF_WEEKDAYS[key as WeekType] === value
        ), [])

    const showCurrentTaskbar = useCallback(() => {
        setDayNumber(monthDay)
    }, [monthDay, setDayNumber])

    return (
        <div
            onClick={showCurrentTaskbar}
            className={s.dayBlockWrapper}
        >
            <div
                className={
                    setClassName()
                }
            >
                <span>{findWeekDay(weekDay)}</span>
                <span>{monthDay}</span>
            </div>
            <div className={s.wrapper}>
                {greenPin && <span className={s.green}/>}
                {redPin && <span className={s.red}/>}
            </div>
        </div>
    )
})

export default DayBlock
