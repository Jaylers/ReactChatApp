import React from 'react'
import { View, Image, Text, StyleSheet, Button, TextInput } from 'react-native'
import Container from '../components/Container'
import login from '../libs/firebase/login'
import onAuthStateChanged from '../libs/firebase/onAuthStateChanged'
import styles from '../styles/layout'
import { pushNotificationToken } from '../libs/notification'
import setDatabase from "../libs/firebase/setDatabase";

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        authLoading: false,
        loading: false,
        email: '',
        password: '',
    };

    login= async () => {
        const token = await pushNotificationToken();
        this.setState({ loading: true });
        const { email, password } = this.state;
        if (email && password){
            login(email, password)
                .then((data) => {
                    console.log("loged in");
                    setDatabase('users/' + data.uid + '/pushToken', token);
                    this.props.navigation.replace('ChatRoom')
                })
                .catch(() => {
                    alert('Invalid username or password');
                    this.setState({ loading: false })
                })
        } else {
            alert('Required username and password');
        }
    };

    componentDidMount = async () => {
        this.setState({ authLoading: true });
        onAuthStateChanged()
            .then(() => {
                this.props.navigation.replace('ChatRoom')
            })
            .catch(() => {
                this.setState({ authLoading: false })
            })
    };

    render() {
        return (
            <Container loading={this.state.authLoading} >
                <View style={styles.container} >
                    <Image source={require('../../assets/logo.png')} />
                    <Text style={styles.text}>Chat app</Text>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.input}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry />
                    {this.state.loading ? <Text>Loading...</Text> :
                        <View style={styles.buttonLayout} >
                            <Button title="Login" onPress={this.login} style={styles.buttonCute}/>
                            <View style={{ width: 10 }} />
                            <Button title="Register" style={styles.buttonCute} onPress={() => { this.props.navigation.navigate('Register') }} />
                        </View>
                    }
                </View>
            </Container>
        )
    }
}

export default LoginScreen