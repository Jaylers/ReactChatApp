import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import getClient from "./firebase/getClient";
import setDatabase from "./firebase/setDatabase";
import getOnce from "./firebase/getOnce";

export default class CameraScanner extends Component {

    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    handleBarCodeScanned = ({ type, data }) => {
        const { firebase } = getClient();
        let userId = firebase.auth().currentUser.uid;

        getOnce(`friends/${userId}/${data}`).once('value').then(snapshot => {
            if(snapshot.val()) {
                console.log(`Me ${userId} and friends ${data} is on room id `, snapshot.val().chatRoomID);
                Alert.alert(
                    'Wow',
                    'Your are both already friends!' ,
                    [
                        {text: 'OK', onPress: () => {
                                this.props.onChangePage(snapshot.val().chatRoomID)
                        } },
                    ],
                );
            } else {
                let timestamp = Date.now();
                setDatabase(`friends/${data}/${userId}`, { chatRoomID: timestamp});
                setDatabase(`friends/${userId}/${data}`, { chatRoomID: timestamp});
                this.props.onChangePage(chatRoomID)
            }
        });

        this.setState({ scanned: true });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;
        if (hasCameraPermission === null) {
            return <Text style={{color:'red'}}> Requesting for camera permission </Text>;
        }
        if (hasCameraPermission === false) {
            return <Text style={{color:'red'}}> No access to camera </Text>;
        }
        return (
            <View style={styles.container}>
                <Text style={{textAlign:'center'}}>Barcode Saner</Text>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={styles.container}/>

                {scanned && (
                    <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
});