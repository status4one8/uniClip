import * as firebase from 'firebase/app'
import 'firebase/firestore'

import config from './firebase-config.json'

firebase.initializeApp(config)

const db = firebase.firestore()

export const addToClipboard = async ({id, clipboardData}) => {
    await db.collection(`clipboard/${id}/contents`).add({
        ...clipboardData,
        deviceType: "PC", 
        deviceName: "POCO F1",
        time: Date.now()
    })
    .then(() => console.log('Copied successfully!'))
    .catch(() => console.log('Unable to copy!'))
}

export const removeFromClipboard = async ({id, contentId}) => {
    await db.collection(`clipboard/${id}/contents`).doc(contentId).delete()
    .then(() => console.log('Removed 1 item from clipboard successfully!'))
    .catch(() => console.log('Unnable to remove item from the clipboard!'))
}

