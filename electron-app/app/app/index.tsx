import React, { Fragment, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
// import { history, configuredStore } from './store';
import { AuthContext } from './context'
import './app.global.css';
// import Root from './containers/Root'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import './utils/dbActions';

// const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const App = props => {

  const [user, setAuthenticatedUser] = useState({});
  const [userName, setUserName] = useState('');
  const Root = require('./containers/Root').default;

  const onAuthStatChanged = (_user) => {
    if (_user) {
        console.log(userName);
        if (!_user.displayName && !!userName) {
            _user.updateProfile({
                displayName: userName,
            });
        }
        setAuthenticatedUser(_user);
    } else {
        setAuthenticatedUser({});
    }
  }

  useEffect(() => {
    const authSubscriber = firebase.auth().onAuthStateChanged(onAuthStatChanged);
    return authSubscriber;
  }, []);

  return (
    <AppContainer>
      <AuthContext.Provider value={{ user, setUserName: (name) => setUserName(name) }}>
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
