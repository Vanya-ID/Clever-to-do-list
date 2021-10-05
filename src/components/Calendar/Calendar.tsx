import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import IPageProps from '../../interfaces/page'
import DayBlock from '../Block/DayBlock/DayBlock'
import Taskbar from '../Block/TaskBar/Taskbar'
import { CURRENT_YEAR, findMonthName, TODAY } from '../../constants'
import s from './Calendar.module.scss'
import Arrow from '../Arrow/Arrow'
import { getUserId } from '../../api/authentication'
import { getTasksWithDates } from '../../api/getTasksWithDates'

const Calendar: React.FC<IPageProps> = React.memo(() => {
    const [userId, setUserId] = useState<string>('')
    const [tasksFromDate, setTasksFromDate] = useState<any>({})

    useEffect(() => {
        getUserId(setUserId)
    }, [])

    useEffect(() => {
        userId && getTasksWithDates(userId, setTasksFromDate)
    }, [userId])

    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [year, setYear] = useState<number>(CURRENT_YEAR)

    const [dayNumber, setDayNumber] = useState<number>(TODAY)

    const getDaysInMonth = () => new Date(year, month, 0).getDate()

    const arrayOfDates = []
    for (let i = 1; i <= getDaysInMonth(); i++) {
        arrayOfDates.push(
            `${year.toString()}-${`0${month}`.slice(-2)}-${`0${i}`.slice(-2)}`
        )
    }

    const dayBlockItems = arrayOfDates.map((date) => {
        let redPin
        let greenPin
        const dayTask = tasksFromDate[date]
        if (dayTask) {
            redPin = Object.values(dayTask).some((el: any) => !el.completed)
            greenPin = Object.values(dayTask).some((el: any) => el.completed)
        }
        return (
            <DayBlock
                selectedDay={dayNumber}
                redPin={redPin ?? false}
                greenPin={greenPin ?? false}
                userId={userId}
                month={month}
                setDayNumber={setDayNumber}
                key={date}
                date={date}
            />
        )
    })
    return (
        <div className={s.homePage_wrapper}>
            <div className={s.calendar_title}>
                Calendar
                <span>{`${findMonthName(month)}  ${year}`}</span>
                <span>
                    <Link to="/logout">logout</Link>
                </span>
            </div>
            <div className={s.days_wrapper}>
                <Arrow
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    way={-1}
                    imgSrc="leftArrow.png"
                />
                {dayBlockItems}
                <Arrow
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    way={1}
                    imgSrc="rightArrow.png"
                />
            </div>
            {dayNumber && (
                <Taskbar userId={userId} month={month} dayNumber={dayNumber} />
            )}
        </div>
    )
})

export default Calendar
