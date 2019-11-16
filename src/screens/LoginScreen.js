import React from 'react'
import { View, Image, Text, StyleSheet, Button, TextInput } from 'react-native'
import Container from '../components/Container'
import login from '../libs/firebase/login'
import onAuthStateChanged from '../libs/firebase/onAuthStateChanged'
import styles from "./../../assets/style/loginStyle"

class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null, //set this to null for block it to cannot open another page
    };

    state = {
        authLoading: true,
        loading: false,
        email: '',
        password: '',
    };

    login = () => {
        const { email, password } = this.state;
        if (email && password){
            this.setState({ loading: true });
            login(email, password)
                .then((data) => {
                    this.props.navigation.replace('ChatRoom')
                })
                .catch((err) => {
                    alert("Invalid Username or password");
                    this.setState({ loading: false })
                })
        } else {
            alert("Username and password is required");
        }

    };

    //like onStart
    componentDidMount = async () => {
        this.setState({ authLoading: true });
        onAuthStateChanged()
            .then((user) => {
                if (user) {
                    this.props.navigation.replace('ChatRoom')
                } else {
                    this.setState({ authLoading: false })
                }
            })
    };

    render() {
        return (
            <Container loading={this.state.authLoading} >
                <View style={styles.container} >
                    <Image source={require('../../assets/logo.png')} />
                    <Text style={styles.text}>Chat app</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        value={this.state.email}
                        disable={this.state.loading}
                        placeholder="Email"
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        disable={this.state.loading}
                        placeholder="Password"
                        secureTextEntry />
                    {this.state.loading ? <Text>Loading...</Text> :
                        <View style={styles.buttonLayout} >
                            <Button title="Login"
                                    style={styles.buttonCute}
                                    onPress={this.login} />
                            <View style={{ width: 10 }} />
                            <Button title="Register"
                                    style={styles.buttonCute}
                                    onPress={() => { this.props.navigation.navigate('Register') }}  />
                        </View>
                    }
                </View>
            </Container>
        )
    }
}

export default LoginScreen