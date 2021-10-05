import firebase from 'firebase/compat'
import { tasksType } from '../components/Block/TaskBar/Taskbar'

export const getTasksAPI = (
    userId: string,
    setCurrentTasks: (tasks: tasksType[]) => void,
    todoId: string,
    setPreloader: (value: boolean) => void
) => {
    setPreloader(true)

    const snapHandler = (snapshot: any) => {
        if (snapshot.val()) {
            setCurrentTasks(Object.values(snapshot.val()))
        } else {
            setCurrentTasks([])
        }
        setPreloader(false)
    }

    const tasksRef = firebase.database().ref(`${userId}/${todoId}`)
    tasksRef.on('value', snapHandler)

    return { tasksRef, valueListenerHandler: snapHandler }
}
