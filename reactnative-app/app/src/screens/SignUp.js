/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import LoadingDialog from '../components/LoadingDialog';
import { signUp } from '../utils';
import { PRIMARY } from '../constants';
import { useAuth } from '../context';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        name: '',
    });
    const { setUserName } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            setUserName(credentials.name);
            await signUp(credentials.email, credentials.password);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Let's Go!</Text>
            <LoadingDialog visible={loading} />
            <Snackbar visible={!!error} onDismiss={() => setError(null)}>
                {error}
            </Snackbar>
            <Button
                mode="text"
                color="#fff"
                style={styles.insteadButton}
                onPress={() => {
                    props.navigation.navigate('Login');
                }}>
                Login
            </Button>
            <View style={styles.bottomSheet}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={[
                        styles.input,
                        {
                            marginTop: 40,
                        },
                    ]}
                    label="Name"
                    mode="outlined"
                    value={credentials.name}
                    onChangeText={(text) =>
                        setCredentials({
                            ...credentials,
                            name: text,
                        })
                    }
                />
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
                    disabled={
                        !credentials.email ||
                        !credentials.password ||
                        !credentials.name
                    }
                    onPress={handleSubmit}>
                    LOGIN
                </Button>
            </View>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: -40,
        left: 0,
        borderRadius: 40,
        height: '75%',
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
    },
    insteadButton: {
        position: 'absolute',
        top: 30,
        right: 10,
    },
});
