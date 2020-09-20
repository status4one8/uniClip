import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppIntro from 'react-native-parallax-onboarding';
import { PRIMARY, PRIMARY_TRANSLUCENT } from '../constants';

const OnBoarding = (props) => {
    const pageArray = [
        {
            title: 'Welcome to UniClip',
            description: 'The Universal Clipboard',
            img: require('../images/clipboard.png'),
            backgroundColor: '#fff',
            fontColor: PRIMARY,
            imgStyle: {
                height: 200,
                width: 200,
            },
            level: 10,
        },
        {
            title: 'Universal',
            description:
                'A universal clipboard that syncs accross devices in real-time',
            backgroundColor: '#fff',
            img: require('../images/realtime.png'),
            fontColor: PRIMARY,
            imgStyle: {
                height: 200,
                width: 200,
            },
            level: 10,
        },
    ];

    return (
        <AppIntro
            pageArray={pageArray}
            customStyles={{
                title: {
                    textAlign: 'center',
                    fontFamily: 'bold',
                },
                description: {
                    textAlign: 'center',
                    fontFamily: 'regular',
                },
                btnContainer: { flex: 1 },
                controllText: {
                    fontFamily: 'bold',
                    fontWeight: 'normal',
                },
            }}
            onDoneBtnClick={() => {
                props.navigation.navigate('SignUp');
            }}
            onSkipBtnClick={() => {
                props.navigation.navigate('SignUp');
            }}
            dotColor={PRIMARY_TRANSLUCENT}
            activeDotColor={PRIMARY}
            rightTextColor={PRIMARY}
            leftTextColor={PRIMARY}
        />
    );
};

export default OnBoarding;

const styles = StyleSheet.create({});
