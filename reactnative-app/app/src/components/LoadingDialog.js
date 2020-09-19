import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Paragraph,
    Dialog,
    Portal,
} from 'react-native-paper';

const LoadingDialog = (props) => {
    const { title = 'Loading', description = 'Please Wait', visible } = props;

    return (
        <Portal>
            <Dialog visible={visible}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size={50} animating={true} />
                        <Paragraph style={styles.description}>
                            {description}
                        </Paragraph>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

const styles = StyleSheet.create({
    loadingContent: {
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
        alignItems: 'center',
    },
    description: {
        marginLeft: 20,
    },
});

export default LoadingDialog;
