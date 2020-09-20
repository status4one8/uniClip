import React, {useEffect} from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from '../Routes';
import * as firebase from 'firebase/app';
import { useAuth } from '../context';
import { clipboard, nativeImage } from 'electron';
// type Props = {
//   store: Store;
//   history: History;
// };



const Root = () => {

    // const { user } = useAuth()

    // useEffect(() => {
    //     console.log(`clipboard/${user.uid}/contents`)
    //     // const unsubscribe = firebase.firestore().collection(`clipboard/${user.uid}/contents`)
    //     // .orderBy("time", "desc")
    //     // .limit(1)
    //     // .onSnapshot((snap) => {
    //     //     snap.docChanges().forEach((change) => {
    //     //         if (change.type === 'added') {
    //     //             console.log("Newly added", change.doc.data())
    //     //             const clip = change.doc.data();
    //     //             if (clip.isImage) {
    //     //                 const image = nativeImage.createFromDataURL(clip.content)
    //     //                 clipboard.writeImage(image)
    //     //             } else {
    //     //                 clipboard.writeText(clip.content)
    //     //             }
    //     //         }
    //     //     })
    //     // })
    //     return () => {
    //         console.log('Unsubscribed')
    //         // unsubscribe();
    //     }
    // })

    return (
        <Routes />
    );
};

export default hot(Root);

