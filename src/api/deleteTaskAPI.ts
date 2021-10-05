import firebase from 'firebase/compat'

export const deleteTaskAPI = async (
    userId: string,
    todoId: string,
    taskId: string
) => {
    const tasksRef = firebase.database().ref(userId).child(todoId).child(taskId)
    await tasksRef.remove()
}
