/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import {
    PC_COLOR,
    ANDROID_COLOR,
    PC_COLOR_TRANSLUCENT,
    ANDROID_COLOR_TRANSLUCENT,
    PRIMARY,
} from '../constants';
import Share from 'react-native-share';
import Clipboard from '@react-native-community/clipboard';

import {
    IconButton,
    Text,
    Avatar,
    Chip,
    Snackbar,
    Portal,
} from 'react-native-paper';
import moment from 'moment';
import { useAuth } from '../context';
import { deleteClipboardContent } from '../utils';

const ClipboardCard = (props) => {
    const { isImage, content, device, time, id, deviceType } = props.clip;

    const [accordianOpen, setAccordianOpen] = useState(false);
    const [infoMessage, setInfoMessage] = useState('');
    const growAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const { user } = useAuth();

    const handleCopy = async () => {
        //Clipboard
        if (isImage) {
            try {
                await Share.open({
                    url: content,
                    saveToFiles: true,
                });
                setInfoMessage('Image saved.');
            } catch (error) {
                setInfoMessage('Image not saved.');
            }
            return;
        }

        Clipboard.setString(content);
        setInfoMessage('Copied to clipboard.');
    };

    const handleShare = async () => {
        // if (isImage) return;

        try {
            const options = {
                title: 'UniClip',
            };
            if (isImage) {
                options.url = content;
                options.message = 'Image from Clipboard';
            } else {
                options.message = content;
            }
            const shareResponse = await Share.open(options);
            setInfoMessage('Shared clipboard successfully.');
        } catch (error) {
            // dismissed
            setInfoMessage('Sharing cancelled.');
        }
    };

    const handleDelete = async () => {
        await deleteClipboardContent(user.uid, id);
    };

    return (
        <>
            <Portal>
                <Snackbar
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                    }}
                    visible={!!infoMessage}
                    onDismiss={() => setInfoMessage('')}>
                    {infoMessage}
                </Snackbar>
            </Portal>
            <View style={styles.card}>
                {isImage && (
                    <Image
                        style={styles.image}
                        source={{
                            uri: content,
                        }}
                    />
                )}
                <View style={styles.cardContent}>
                    <View style={styles.contentContainer}>
                        {!isImage && (
                            <Text
                                ellipsizeMode={!accordianOpen ? 'clip' : 'tail'}
                                numberOfLines={
                                    !accordianOpen ? 2 : content.length
                                }
                                style={styles.contentText}>
                                {content}
                            </Text>
                        )}

                        <View style={styles.timeContainer}>
                            <Avatar.Icon
                                size={25}
                                color={PRIMARY}
                                style={{
                                    backgroundColor: '#fff',
                                }}
                                icon="clock-outline"
                            />
                            <Text style={{ marginLeft: 10 }}>
                                {moment(time).fromNow()}
                            </Text>
                        </View>
                        <Chip
                            style={[
                                styles.deviceChip,
                                {
                                    borderColor:
                                        deviceType === 'PC'
                                            ? PC_COLOR
                                            : ANDROID_COLOR,
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
                    <View style={{ justifyContent: 'center' }}>
                        <Animated.View
                            style={{
                                transform: [
                                    {
                                        rotateZ: rotateAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '180deg'],
                                        }),
                                    },
                                ],
                            }}>
                            <IconButton
                                icon="chevron-down"
                                size={30}
                                onPress={() => {
                                    if (accordianOpen) {
                                        Animated.parallel([
                                            Animated.spring(growAnim, {
                                                toValue: 10,
                                                duration: 200,
                                                useNativeDriver: false,
                                            }),
                                            Animated.spring(rotateAnim, {
                                                toValue: 0,
                                                duration: 200,
                                                useNativeDriver: true,
                                            }),
                                        ]).start();
                                    } else {
                                        Animated.parallel([
                                            Animated.spring(growAnim, {
                                                toValue: 60,
                                                duration: 200,
                                                useNativeDriver: false,
                                            }),
                                            Animated.spring(rotateAnim, {
                                                toValue: 1,
                                                duration: 200,
                                                useNativeDriver: true,
                                            }),
                                        ]).start();
                                    }
                                    setAccordianOpen(!accordianOpen);
                                }}
                            />
                        </Animated.View>
                    </View>
                </View>
                <Animated.View
                    style={{
                        height: growAnim,
                        overflow: 'hidden',
                    }}>
                    {accordianOpen && (
                        <>
                            <View style={styles.buttonContainer}>
                                <IconButton
                                    size={30}
                                    icon={
                                        !isImage ? 'content-copy' : 'download'
                                    }
                                    onPress={handleCopy}
                                />
                                <IconButton
                                    size={30}
                                    onPress={handleShare}
                                    icon="share-variant"
                                />
                                <IconButton
                                    onPress={handleDelete}
                                    size={30}
                                    icon="delete"
                                />
                            </View>
                        </>
                    )}
                </Animated.View>
            </View>
        </>
    );
};

export default ClipboardCard;

const styles = StyleSheet.create({
    card: {
        width: '96%',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 100,
        marginVertical: 10,
        marginHorizontal: '2%',
        elevation: 2,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        top: 0,
        left: 0,
    },
    cardContent: {
        padding: 20,
        flexDirection: 'row',
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
    buttonContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
});
