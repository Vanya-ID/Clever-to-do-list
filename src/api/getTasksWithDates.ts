import firebase from 'firebase/compat'
import { tasksType } from '../components/Block/TaskBar/Taskbar'

export const getTasksWithDates = async (
    userId: string,
    setTasks: (value: tasksType | []) => void
) => {
    let tasks

    const tasksRef = await firebase.database().ref(userId)

    await tasksRef.on('value', (snap) => {
        if (snap.val()) {
            tasks = snap.val()
            setTasks(tasks)
        } else {
            setTasks([])
        }
    })
    return tasks
}
