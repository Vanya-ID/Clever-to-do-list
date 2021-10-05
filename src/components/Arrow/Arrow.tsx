import React from 'react'
import s from '../Calendar/Calendar.module.scss'

type ArrowPropsType = {
    imgSrc: string
    way: number
    setMonth: (val: number) => void
    month: number
    setYear: (val: number) => void
    year: number
}

const Arrow: React.FC<ArrowPropsType> = React.memo((props) => {
    const { imgSrc, way, setMonth, setYear, month, year } = props

    const changeMonth = () => {
        if (month + way === 0) {
            setMonth(12)
            setYear(year - 1)
        } else if (month + way === 13) {
            setYear(year + 1)
            setMonth(1)
        } else {
            setMonth(month + way)
        }
    }

    return (
        <img
            onClick={changeMonth}
            className={s.arrow}
            src={imgSrc}
            alt="Стрела"
        />
    )
})

export default Arrow
