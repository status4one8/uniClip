import React, { ReactNode, useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { useAuth } from '../context'
import 'firebase/firestore'

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const [clipboardContents, setClipboardContents] = useState([])

  // const db = firebase.firestore()
  // const { user } = useAuth()
  // useEffect(() => {
  //   const unsubscribe = db.collection(`clipboard/${user.uid}/contents`).limit(1).onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       setClipboardContents([...clipboardContents, doc.data().content])
  //     })
  //   })

  //   return () => {
  //     unsubscribe()
  //   }

  // }, [clipboardContents])

  return <>{children}</>;
}
