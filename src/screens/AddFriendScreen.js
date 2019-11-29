import React from 'react'
import { View, Text, Image } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import Container from '../components/Container'
import MyQrCode from "../libs/MyQrCode";
import CameraScanner from "../libs/CameraScanner";

class AddFriendScreen extends React.Component {
    static navigationOptions = {
        title: 'Add friend',
        selectedTab: 'Scan',
    };

    state = {
        selectedTab: 'Scan',
        roomId: ''
    };

    render() {
        return (
            <Container>
                <View style={{ width: '100%', height: '100%' }}>
                    <TabNavigator>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'Scan'}
                            title="Scan"
                            renderIcon={() => <Image style={{width: 25, height: 25}} source={require('../../assets/camera.png')} />}
                            renderSelectedIcon={() => <Image style={{width: 25, height: 25}} source={require('../../assets/camera.png')} />}
                            onPress={() => this.setState({ selectedTab: 'Scan' })}>
                            <CameraScanner onChangePage={(roomID) => {
                                this.setState({roomID : roomID});
                                this.props.navigation.goBack()
                            }}/>
                        </TabNavigator.Item>
                        <TabNavigator.Item
                            selected={this.state.selectedTab === 'myQrCode'}
                            title="My QR Code"
                            renderIcon={() => <Image style={{width: 25, height: 25}} source={require('../../assets/QRcode.png')} />}
                            renderSelectedIcon={() => <Image style={{width: 25, height: 25}} source={require('../../assets/QRcode.png')} />}
                            onPress={() => this.setState({ selectedTab: 'myQrCode' })}>

                            <MyQrCode />

                        </TabNavigator.Item>
                    </TabNavigator>
                </View>
            </Container>
        )
    }
}

export default AddFriendScreen