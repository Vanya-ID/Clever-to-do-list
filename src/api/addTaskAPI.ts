import { getDatabase, push, ref, set } from 'firebase/database'

export const addTaskAPI = async (
    userId: string,
    todoId: string,
    title: string,
    description = ''
) => {
    const db = getDatabase()
    const postListRef = ref(db, `${userId}/${todoId}`)
    const newPostRef = push(postListRef)
    set(newPostRef, {
        title,
        completed: false,
        id: newPostRef.key,
        description,
        userId,
    })
}
