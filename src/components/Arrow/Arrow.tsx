import React, {useCallback} from 'react'
import s from '../Calendar/Calendar.module.scss'
import {december, january, maxImpossibleMonth, minImpossibleMonth} from "../../constants";
import {ArrowPropsType} from "./Arrow.type";


const Arrow: React.FC<ArrowPropsType> = React.memo(({imgSrc, way, setMonth, setYear, month, year}) => {
    const prevYear = year - 1;
    const nextYear = year + 1;


    const changeMonth = useCallback(() => {
        if (month + way === minImpossibleMonth) {
            setMonth(december)
            setYear(prevYear)
        } else if (month + way === maxImpossibleMonth) {
            setYear(nextYear)
            setMonth(january)
        } else {
            setMonth(month + way)
        }
    }, [month, nextYear, prevYear, way, setMonth, setYear])

    return (
        <img
            onClick={changeMonth}
            className={s.arrow}
            src={imgSrc}
            alt="Arrow"
        />
    )
})

export default Arrow
