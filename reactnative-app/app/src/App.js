import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';
import AppNavigator from './screens';
import { THEME } from './constants';
import { AuthContext } from './context';

const App = () => {
    const [user, setAuthenticatedUser] = useState({});

    const getUserFromStorage = async () => {
        try {
            await AsyncStorage.getItem('user');
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserFromStorage();
    }, []);

    const setUser = async (_user = {}) => {
        try {
            await AsyncStorage.setItem('user', _user);
            setAuthenticatedUser(_user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PaperProvider theme={THEME}>
            <AuthContext.Provider value={{ user, setUser }}>
                <AppNavigator />
            </AuthContext.Provider>
        </PaperProvider>
    );
};

export default App;
