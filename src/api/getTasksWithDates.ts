import firebase from 'firebase/compat'
import {TasksFromDateType} from "../components/Calendar/Calendar";

export const getTasksWithDates = async (
    userId: string,
    setTasks: (value: TasksFromDateType) => void
) => {
    let tasks

    const tasksRef = await firebase.database().ref(userId)

    await tasksRef.on('value', (snap) => {
        if (snap.val()) {
            tasks = snap.val()
            setTasks(tasks)
        } else {
            setTasks({})
        }
    })
    return tasks
}
