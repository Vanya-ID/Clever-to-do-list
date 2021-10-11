export type DayBlockPropsType = {
    date: string
    setDayNumber: (day: number) => void
    selectedDay: number
    month: number
    userId: string
    redPin: boolean
    greenPin: boolean
}

export type WeekType = 'Sun' | 'Mon' | 'Tue' | 'Wen' | 'Thu' | 'Fri' | 'Sat'
