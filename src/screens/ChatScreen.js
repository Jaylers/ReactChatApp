import React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import Container from "../components/Container";
import onAuthStateChanged from '../libs/firebase/onAuthStateChanged'
import getFirebaseClient from '../libs/firebase/getClient'
import { GiftedChat } from 'react-native-gifted-chat'
import pushDatabase from '../libs/firebase/pushDatabase'

class ChatScreen extends React.Component {
    static navigationOptions = {
        title: 'Chat',
    };

    state = {
        database: null,
        loading: true,
        messages: [],
        chatId: '',
        user: null,
        friend: null
    };

    componentDidMount = async () => {
        const chatId = this.props.navigation.getParam('chatId', '');
        const friend = {
            uid: this.props.navigation.getParam('uid', ''),
            avatar: this.props.navigation.getParam('avatar', ''),
            name: this.props.navigation.getParam('name', ''),
            pushToken: this.props.navigation.getParam('pushToken', ''),
        };
        const { initFirebase } = getFirebaseClient();
        const database = initFirebase.database();
        await this.setState({ database, chatId, friend });
        this.getUser()
    };

    getUser = () => {
        const { database } = this.state;
        onAuthStateChanged()
            .then(async (userTemp) => {
                if (userTemp) {
                    const doc = `users/${userTemp.uid}`;
                    database.ref(doc).once('value')
                        .then(async (snapshot) => {
                            const temp = snapshot.val();
                            const user = {
                                uid: userTemp.uid,
                                ...temp,
                            };

                            await this.setState({ user, loading: false });
                            this.watchMessage()
                        })
                } else {
                    this.props.navigation.replace('Login')
                }
            })
    };

    onSend = (messages) => {
        const { user, chatId, friend } = this.state;
        const doc = `chats/${chatId}`;
        const [msg] = messages;
        const timestamp = new Date().getTime();
        const data = {
            timestamp,
            message: msg.text,
            type: 'text',
            uid: user.uid,
        };

        pushDatabase(doc, data).then(r => {

        })
    };

    componentWillUnmount = () => {
        this.clearConnection()
    };

    clearConnection = () => {
        const { database, chatId } = this.state;
        const doc = `chats/${chatId}`;
        database.ref(doc).off()
    };

    watchMessage = () => {
        const { database, chatId, user, friend } = this.state;
        const doc = `chats/${chatId}`;
        database.ref(doc).limitToLast(50).on('child_added', (snapshot) => {
            const msg = snapshot.val();
            const messages = [{
                _id: `${msg.timestamp}`,
                text: msg.message,
                createdAt: new Date(msg.timestamp),
                user: {
                    _id: msg.uid,
                    avatar: msg.uid === user.uid ? user.avatar : friend.avatar,
                }
            }];
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }))
        })
    };

    render() {
        return (
            <Container loading={this.state.loading} >
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 100}>
                    {
                        <GiftedChat
                            messages={this.state.messages}
                            onSend={messages => this.onSend(messages)}
                            user={{
                                _id: this.state.user ? this.state.user.uid : '',
                            }}
                        />
                    }
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default ChatScreen