/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import LoadingDialog from '../components/LoadingDialog';
import { PRIMARY } from '../constants';
import { signIn } from '../utils';

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await signIn(credentials.email, credentials.password);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <LoadingDialog visible={loading} />
            <Snackbar visible={!!error} onDismiss={() => setError(null)}>
                {error}
            </Snackbar>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Button
                mode="text"
                color="#fff"
                style={styles.insteadButton}
                onPress={() => {
                    props.navigation.navigate('SignUp');
                }}>
                Sign Up
            </Button>
            <View style={styles.bottomSheet}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                    style={[
                        styles.input,
                        {
                            marginTop: 40,
                        },
                    ]}
                    label="Email"
                    mode="outlined"
                    value={credentials.email}
                    onChangeText={(text) =>
                        setCredentials({
                            ...credentials,
                            email: text,
                        })
                    }
                />
                <TextInput
                    style={[
                        styles.input,
                        {
                            marginTop: 30,
                        },
                    ]}
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    value={credentials.password}
                    onChangeText={(text) =>
                        setCredentials({
                            ...credentials,
                            password: text,
                        })
                    }
                />
                <Button
                    mode="contained"
                    style={styles.submitButton}
                    disabled={!credentials.email || !credentials.password}
                    onPress={handleSubmit}>
                    LOGIN
                </Button>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
        paddingTop: 20,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: -40,
        left: 0,
        borderRadius: 40,
        height: '65%',
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 50,
        paddingHorizontal: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    welcomeText: {
        position: 'absolute',
        width: 200,
        top: 100,
        left: 30,
        color: '#fff',
        fontSize: 30,
    },
    input: {
        fontWeight: 'bold',
    },
    submitButton: {
        marginTop: 40,
    },
    forgotPassword: {
        marginTop: 20,
        textAlign: 'center',
        opacity: 0.5,
        color: PRIMARY,
    },
    insteadButton: {
        position: 'absolute',
        top: 30,
        right: 10,
    },
});
