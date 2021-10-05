import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/compat'
import config from './config'

const Firebase = firebase.initializeApp(config.firebase)

export const db = getFirestore()

export const auth = firebase.auth()
export default Firebase
