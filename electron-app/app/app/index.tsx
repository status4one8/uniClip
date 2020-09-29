/* eslint-disable global-require */
import React, { Fragment, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
// import { history, configuredStore } from './store';
import firebase from 'firebase';
import { AuthContext } from './context';

import './app.global.css';
import 'firebase/auth';
// import Root from './containers/Root'
import './utils/dbActions';
import {addToClipboard} from './utils/dbActions';

const clipboard = require('electron-clipboard-extended');


// const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;
const clipListener = clipboard
  .on('text-changed', () => {
      const user = firebase.auth().currentUser
      const currentText = clipboard.readText();
      // console.log(user);
      if (user?.uid) {
          addToClipboard({ 
              id: user.uid,
              clipboardData: {
              content: currentText,
              isImage: false,
              }
          });
      }
  // console.log(currentText)
  })
  .on('image-changed', () => {
      const user = firebase.auth().currentUser
      const currentImage = clipboard.readImage();
      const dataURL = currentImage.toDataURL();
      const stringLength = dataURL.length - 'data:image/png;base64,'.length;
      const sizeInBytes =
      4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
      const sizeInKb = sizeInBytes / 1000;
      if (sizeInKb > 4096) {
          console.log('Greater than 4MB');
          return;
      }

      if (user?.uid) {
      addToClipboard({ 
          id: user.uid,
          clipboardData: {
          content: dataURL,
          isImage: true,
          }
      });
      }

  })
const App = () => {
  const [user, setAuthenticatedUser] = useState({});
  const [userName, setUserName] = useState('');
  const Root = require('./containers/Root').default;
  clipListener.startWatching();

  const onAuthStatChanged = (_user: any) => {
    if (_user) {
        console.log(_user);
        if (!_user.displayName && !!userName) {
            _user.updateProfile({
                displayName: userName,
            });
        }
        setAuthenticatedUser(_user);
    } else {
        setAuthenticatedUser({});
    }
  };

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStatChanged);
    
    
    return () => {
      //authSubscriber();
      //clipboard.stopWatching();
    }
  }, []);

  return (
    <AppContainer>
      <AuthContext.Provider value={{ user, setUserName: (name : string) => setUserName(name) }}>
        <Root/>
      </AuthContext.Provider>
    </AppContainer>
  )
};

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  render(
    <App />,
    document.getElementById('root')
  );
});
