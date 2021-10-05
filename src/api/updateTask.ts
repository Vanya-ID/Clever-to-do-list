import firebase from 'firebase/compat'

export const updateTaskDescriptionAPI = async (
    userId: string,
    todoId: string,
    taskId: string,
    description: string
) => {
    const tasksRef = firebase.database().ref(userId).child(todoId).child(taskId)
    await tasksRef.update({
        description,
    })
}

export const updateTaskTitleAPI = async (
    userId: string,
    todoId: string,
    taskId: string,
    newTitle: string
) => {
    const tasksRef = firebase.database().ref(userId).child(todoId).child(taskId)
    await tasksRef.update({
        title: newTitle,
    })
}

export const updateTaskStatusAPI = (
    userId: string,
    todoId: string,
    taskId: string,
    completed: boolean
) => {
    const tasksRef = firebase.database().ref(userId).child(todoId).child(taskId)
    tasksRef.update({
        completed: !completed,
    })
}
