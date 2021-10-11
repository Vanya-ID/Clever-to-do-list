import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import PagePropsType from '../../interfaces/page'
import DayBlock from '../DayBlock/DayBlock'
import s from './Calendar.module.scss'
import Arrow from '../Arrow/Arrow'
import {getUserId} from '../../api/authentication'
import {getTasksWithDates} from '../../api/getTasksWithDates'
import {CURRENT_YEAR, TODAY} from "../../constants";
import {findMonthName} from "../../utils/findMonthName";
import leftArrow from '../../assets/leftArrow.png'
import rightArrow from '../../assets/rightArrow.png'
import {TasksType} from "../TaskBar/Taskbar.type";
import Taskbar from "../TaskBar/Taskbar";

export type TasksFromDateType = {
    [dateKey: string]: {
        [key: string]: TasksType
    }
}

const Calendar: React.FC<PagePropsType> = React.memo(() => {
    const [userId, setUserId] = useState<string>('')

    const [tasksFromDate, setTasksFromDate] = useState<TasksFromDateType>({})

    useEffect(() => {
        getUserId(setUserId)
    }, [])

    useEffect(() => {
        userId && getTasksWithDates(userId, setTasksFromDate)
    }, [userId])

    const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
    const [year, setYear] = useState<number>(CURRENT_YEAR)

    const [dayNumber, setDayNumber] = useState<number>(TODAY)

    const getDaysInMonth = useCallback(() => new Date(year, month, 0).getDate(), [month, year])

    const arrayOfDates = new Array(getDaysInMonth()).fill(0).map((_, i) => `${year.toString()}-${`0${month}`.slice(-2)}-${`0${i + 1}`.slice(-2)}`)

    const dayBlockItems = arrayOfDates.map((date) => {
        const dayTask = tasksFromDate[date]
        return {
            selectedDay: dayNumber,
            redPin: dayTask && Object.values(dayTask).some((el: TasksType) => !el.completed),
            greenPin: dayTask && Object.values(dayTask).some((el: TasksType) => el.completed),
            userId: userId,
            month: month,
            setDayNumber: setDayNumber,
            date: date,
        }
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
                    imgSrc={leftArrow}
                />
                {dayBlockItems.map(item => (
                    <DayBlock
                        selectedDay={item.selectedDay}
                        redPin={item.redPin}
                        greenPin={item.greenPin}
                        userId={item.userId}
                        month={item.month}
                        setDayNumber={item.setDayNumber}
                        key={item.date}
                        date={item.date}
                    />
                ))}
                <Arrow
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                    way={1}
                    imgSrc={rightArrow}
                />
            </div>
            {dayNumber && (
                <Taskbar userId={userId} month={month} dayNumber={dayNumber}/>
            )}
        </div>
    )
})

export default Calendar
