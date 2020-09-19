import React, { ReactNode, useState, useEffect } from 'react';
import * as firebase from 'firebase'
import 'firebase/firestore'

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const [clipboardContents, setClipboardContents] = useState([])

  const db = firebase.firestore()

  useEffect(() => {
    const unsubscribe = db.collection(`clipboard/${id}/contents`).limit(1).onSnapshot(querySnapshot => {
      querySnapshot.forEach(doc => {
        setClipboardContents([...clipboardContents, doc.data().content])
      })
    })

    return () => {
      unsubscribe()
    }

  }, [clipboardContents])

  return <>{children}</>;
}
