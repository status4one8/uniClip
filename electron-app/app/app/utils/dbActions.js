import * as firebase from 'firebase/app'
import 'firebase/firestore'

import config from './firebase-config.json'

firebase.initializeApp(config)

const db = firebase.firestore()

const getPlatform = () => {
    if (navigator.userAgent.indexOf('Win')!=-1) return 'Windows'
    if (navigator.userAgent.indexOf('Linux')!=-1) return 'Linux'
    if (navigator.userAgent.indexOf('X11')!=-1) return 'Unix'
    if (navigator.userAgent.indexOf('Mac')!=-1) return 'Macintosh'
}

export const addToClipboard = async ({id, clipboardData}) => {
    await db.collection(`clipboard/${id}/contents`).add({
        ...clipboardData,
        deviceType: "PC", 
        deviceName: getPlatform(),
        time: Date.now()
    })
}

export const removeFromClipboard = async ({id, contentId}) => {
    await db.collection(`clipboard/${id}/contents`).doc(contentId).delete()
}