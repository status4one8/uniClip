import * as firebase from 'firebase/app'
import 'firebase/firestore'

import config from './firebase-config.json'

firebase.initializeApp(config)

const db = firebase.firestore()

// creating a new account
const createUser = async () => {
    await db.collection('users').add({
        name: '',
        username: '',
        password: ''
    })
    .then((res) => {
        console.log('Successfully created an account!')
    })
    .catch((err) => {
        console.log('Error creating an account!')
    })
}


// login into an account
const loginUser = async () => {
    await db.collection('users').get()
    .then((querySnapshot) => {
        querySnapshot.forEach(({data}) => {
            if (data.name === '' && data.username === '') {
                // check for pass
            }

        })
    })

}


// store a file
const storeCopied = async () => {
    const date = new Date()

    // upload file to drive if any with file_name as [ORIGINAL_FILE_NAME]+[NAME]+'&'+[USERNAME]

    // create a file_storage
    await db.collection('file_storage').add({
        file_name: '',      // in the format [ORIGINAL_FILE_NAME]+[NAME]+'&'+[USERNAME]
        drive_ref: ''       // drive link
    })
    .then((res) => {
        // create new collection called file_info
        await db.collection('users').get()
        .then(async (querySnapshot)=> {
            querySnapshot.forEach((doc) => {
                if (doc.data.name === '' && doc.data.username === '') {
                    // add information about the file and map it to a specific user
                    await db.collection(`users/${doc.id}/file_info`).get()
                    .then(async (querySnapshotForFileInfo) => {
                        // To ensure that there's only one and only one file or text copied for any user
                        await db.collection(`users/${doc.id}/file_info/`).doc(`${querySnapshotForFileInfo[0].id}`)
                        .update({
                            file_name: '',    // latest ORIGINAL_FILE_NAME
                            file_ref: 'file_storage/'+res.id,   // latest
                            file_type: '',  // latest
                            timestamp: {
                                date: String(date.getDate()).padStart(2, '0')+String(date.getMonth()+1).padStart(2, '0')+date.getFullYear(),
                                time: date.getHours()+date.getMinutes()+date.getSeconds()
                            }
                        })
                        .then((res) => console.log('Recent file or text updated!'))
                        .catch(err => {
                            // there wasn't any file_info collection
                            await db.collection(`users/${doc.id}/file_info`).add({
                                file_name: '',    // ORIGINAL_FILE_NAME
                                file_ref: 'file_storage/'+res.id,
                                file_type: '',
                                timestamp: {
                                    date: String(date.getDate()).padStart(2, '0')+String(date.getMonth()+1).padStart(2, '0')+date.getFullYear(),
                                    time: date.getHours()+date.getMinutes()+date.getSeconds()
                                }
                            })
                            .then(() => console.log('File or text copied successfully!'))
                            .catch(() => console.log('Unable to copy the file or text!'))
                        })
                    })
                }
            })
        })
        .catch(err => console.log('User not found!'))
    })
    .catch((err) => {
        console.log('Unable to copy the file or text!')
    })    
}


// retrieve the file

const getFile = async () => {
    await db.collection('users').get()
    .then(async (querySnapshotForUser) => {
        querySnapshotForUser.forEach((doc) => {
            if (doc.data.name === '' && doc.data.username === '') {
                // gets the file copied recently
                await db.collection(`users/${doc.id}/file_info`).get()
                .then(async (querySnapshotForFileInfo) => {
                    querySnapshotForFileInfo.forEach(({data}) => {
                        // checks for file_name in file_storage collecction
                        await db.collection('file_storage').get()
                        .then(async (querySnapshot3) => {
                            querySnapshot3.forEach((file_doc) => {
                                if (file_doc.data.file_name === `${data.file_name+doc.name}&${doc.username}`)
                                    // get drive link
                                    const drive_link = file_doc.data.drive_ref
                            })
                        })
                        .catch(err => console.log('No file found on the drive!'))
                    })
                })
                .catch(err => console.log('File doesn\'t exist!'))
            }
        })
    })
    .catch(err => console.log('Unable to get to the collection user!'))
}