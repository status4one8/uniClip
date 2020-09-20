/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    ScrollView,
    Image,
    useWindowDimensions,
} from 'react-native';
import { Text, FAB } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../context';
import ClipboardCard from '../components/ClipboardCard';
import firestore from '@react-native-firebase/firestore';

const Home = (props) => {
    const  displayName = auth()?.currentUser?.displayName;
    StatusBar.setBarStyle('dark-content');
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const { user } = useAuth();
    const [clipboard, setClipboard] = useState([]);
    useEffect(() => {
        firestore()
            .collection(`clipboard/${user.uid}/contents`)
            .orderBy('time', 'desc')
            .onSnapshot((docs) => {
                if (!docs) return;
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
        <>
            <FAB
            style={styles.fab}
            icon="logout"
            onPress={async () => {
                await auth().signOut();
            }}
        />
        <ScrollView
            contentContainerStyle={{
                paddingBottom: clipboard.length === 0 ? 0 : 100,
                paddingHorizontal: 10,
            }}
            style={styles.container}>
           
            <Text style={styles.greet}>Welcome, {displayName}</Text>
            <Text style={styles.subtitle}>Your Shared Clipboard</Text>
            {clipboard.length > 0 && (
                <View>
                    {clipboard.map((clip) => (
                        <ClipboardCard key={clip.id} clip={clip} />
                    ))}
                </View>
            )}
            {clipboard.length === 0 && (
                <View
                    style={{
                        height: windowHeight - 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={require('../images/empty.png')}
                        style={{
                            width: 300,
                            height: 300,
                        }}
                    />
                    <Text>Go ahead add some clips!</Text>
                </View>
            )}
        </ScrollView>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        paddingTop: 65,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingBottom: 500,
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
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 100,
    },
});
