import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../context';
import ClipboardCard from '../components/ClipboardCard';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
    const { displayName } = auth().currentUser;
    StatusBar.setBarStyle('dark-content');

    const { user } = useAuth();
    const [clipboard, setClipboard] = useState([]);
    useEffect(() => {
        firestore()
            .collection(`clipboard/${user.uid}/contents`)
            .onSnapshot((docs) => {
                setClipboard(
                    docs.docs.map((d) => ({
                        ...d.data(),
                        id: d.id,
                    })),
                );
            });
    }, []);

    // const clipboard = [
    //     {
    //         isImage: false,
    //         content: 'Hello World',
    //         device: 'Windows 10',
    //         time: Date.now(),
    //         id: 1,
    //         deviceType: 'PC',
    //     },
    //     {
    //         isImage: false,
    //         content: 'UniClip is amazing!',
    //         device: 'Poco F1',
    //         time: Date.now(),
    //         id: 2,
    //         deviceType: 'PHONE',
    //     },
    // ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.greet}>Welcome, {displayName}</Text>
            <Text style={styles.subtitle}>Your Shared Clipboard</Text>
            <View>
                {clipboard.map((clip) => (
                    <ClipboardCard key={clip.id} clip={clip} />
                ))}
            </View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 65,
        paddingHorizontal: 20,
        backgroundColor: '#F7F6FB',
        paddingBottom: 50,
    },
    greet: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        marginBottom: 30,
        fontSize: 15,
    },
});
