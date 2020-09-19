import * as firebase from 'firebase';
import 'firebase/auth'

const auth = firebase.auth()

export const signIn = async (email, password) => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        const { code } = error;
        let message = error.message;
        if (code === 'auth/invalid-email') {
            message = 'Pleas provide valid email.';
        } else if (code === 'auth/user-disabled') {
            message = 'Account disabled. Please contact us.';
        } else if (code === 'auth/user-not-found') {
            message = 'Please sign up first.';
        } else if (code === 'wrong-password') {
            message = 'Email or password incorrect. Please try again.';
        }
        throw new Error(message);
    }
};

export const signUp = async (email, password) => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        const { code } = error;
        let message = error.message;
        if (code === 'auth/invalid-email') {
            message = 'Pleas provide valid email.';
        } else if (code === 'auth/email-already-in-use') {
            message = 'You have already Signed Up. Please login.';
        } else if (code === 'auth/user-not-found') {
            message = 'Please sign up first.';
        } else if (code === 'auth/weak-password') {
            message = 'Please use a stronger password.';
        }
        throw new Error(message);
    }
};
