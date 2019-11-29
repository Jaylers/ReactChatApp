import React from 'react'
import {View, TouchableHighlight, Text, TouchableOpacity} from 'react-native'
import getUserInfo from "../libs/firebase/getUserInfo";
import {Ionicons} from "@expo/vector-icons";
import getDatabase from '../libs/firebase/getDatabase'
import ChatList from '../components/ChatList'
import getFirebaseClient from '../libs/firebase/getClient'
import Container from "../components/Container";

class ChatRoomScreen extends React.Component {
    state = {
        chatData: [],
        loading: true
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Chat room',
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => {
                    const user = getUserInfo.currentUser;
                    navigation.navigate({
                        routeName: 'Profile',
                        params: { uid: user.uid },
                    })
                }} style={{ padding: 10, color: 'red' }} >
                <Text style={{ color : '#508deb'}}>Profile</Text>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity
                title="ADD"
                onPress={() => {
                    navigation.navigate({
                        routeName: 'AddFriend'
                    })
                }}>
                <View style={{width: 30, height: 30, alignItems: 'center', justifyContent: 'center'}}>
                    <Ionicons name="md-person-add" size={32} color="#508deb" />
                </View>
            </TouchableOpacity>
        )
    });

    getChatData = async () => {
        const { firebase } = getFirebaseClient();
        const user = firebase.auth();
        await getDatabase(`friends/${user.currentUser.uid}`, (data) => {
            const promise = Object.keys(data).map((friendId) => {
                return new Promise((resolve) => {
                    getDatabase(`users/${friendId}`, (friend) => {
                        resolve({
                            chatId: data[friendId].chatRoomID,
                            uid: friendId,
                            name: friend.name,
                            avatar: friend.avatar,
                            pushToken: friend.pushToken,
                        })
                    })
                })
            });

            this.setState({loading : false});
            Promise.all(promise).then((chatData) => {
                this.setState({ chatData })
            });
        })
    };

    componentDidMount() {
        this.getChatData()
    }

    render() {
        const { navigation } = this.props;
        return (
            <Container loading={this.state.loading}>
                <View style={{ width: '100%', height: '100%' }}>
                    <ChatList navigation={navigation} chatData={this.state.chatData} />
                </View>
            </Container>
        )
    }
}

export default ChatRoomScreen