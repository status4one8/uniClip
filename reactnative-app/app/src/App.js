import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import AppNavigator from './screens';
import { THEME } from './constants';
import { AuthContext } from './context';

const App = () => {
    const [user, setAuthenticatedUser] = useState({});
    const [userName, setUserName] = useState('');
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');

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
    };

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStatChanged);
        return authSubscriber;
    }, []);

    return (
        <PaperProvider theme={THEME}>
            <AuthContext.Provider
                value={{ user, setUserName: (name) => setUserName(name) }}>
                <AppNavigator />
            </AuthContext.Provider>
        </PaperProvider>
    );
};

export default App;
