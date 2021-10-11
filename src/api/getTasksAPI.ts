import firebase from 'firebase/compat'
import {TasksType} from "../components/TaskBar/Taskbar.type";

export const getTasksAPI = (
    userId: string,
    setCurrentTasks: (tasks: TasksType[]) => void,
    todoId: string,
    setPreloader: (value: boolean) => void
) => {
    setPreloader(true)

    const snapHandler = (snapshot: { val: () => { [s: string]: TasksType } | ArrayLike<TasksType> }) => {
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
