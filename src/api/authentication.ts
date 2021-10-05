import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const getAuthUserAPI = async () => {
    let userId = ''
    const auth = await getAuth()
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            userId = user.uid
        }
    })
    return userId
}

export const getUserId = async (setUserId: (useId: string) => void) => {
    const userId = await getAuthUserAPI()
    setUserId(userId)
}
