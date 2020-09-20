import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import SignUp from './SignUp';
import { useAuth } from '../context';
import Home from './Home';
import OnBoarding from './OnBoarding';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {!user.uid ? (
                    <>
                        {/* <Stack.Screen name="OnBoard" component={OnBoarding} /> */}
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="SignUp" component={SignUp} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
