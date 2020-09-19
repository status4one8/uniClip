/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    PC_COLOR,
    ANDROID_COLOR,
    PC_COLOR_TRANSLUCENT,
    ANDROID_COLOR_TRANSLUCENT,
} from '../constants';
import { IconButton, Text, Avatar, Chip } from 'react-native-paper';
import moment from 'moment';

const ClipboardCard = (props) => {
    const { type, content, device, time, id, deviceType } = props.clip;

    return (
        <View style={styles.card}>
            <View style={styles.contentContainer}>
                <Text style={styles.contentText}>{content}</Text>
                <View style={styles.timeContainer}>
                    <Avatar.Icon size={20} icon="clock-time-four" />
                    <Text style={{ marginLeft: 10 }}>
                        {moment(time).fromNow()}
                    </Text>
                </View>
                <Chip
                    style={[
                        styles.deviceChip,
                        {
                            borderColor:
                                deviceType === 'PC' ? PC_COLOR : ANDROID_COLOR,
                            backgroundColor:
                                deviceType === 'PC'
                                    ? PC_COLOR_TRANSLUCENT
                                    : ANDROID_COLOR_TRANSLUCENT,
                        },
                    ]}
                    mode="outlined"
                    ellipsizeMode="clip"
                    icon={deviceType === 'PC' ? 'laptop' : 'cellphone'}>
                    {device}
                </Chip>
            </View>
            {/* <View>
                <IconButton
                    icon="content-copy"
                    size={30}
                    onPress={() => {
                        console.log('Pressed');
                    }}
                />
            </View> */}
        </View>
    );
};

export default ClipboardCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flexDirection: 'row',
        minHeight: 100,
        padding: 20,
        marginVertical: 10,
        elevation: 2,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        paddingRight: 20,
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    contentDescriptionText: {
        fontSize: 12,
        color: '#000',
    },
    timeContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    deviceChip: {
        marginTop: 10,
        width: 130,
    },
});
