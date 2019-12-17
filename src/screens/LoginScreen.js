import React from 'react'
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView
} from 'react-native'
import Container from '../components/Container'
import login from '../libs/firebase/login'
import onAuthStateChanged from '../libs/firebase/onAuthStateChanged'
import styles from '../styles/layout'

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
        this.setState({ loading: true });
        const { email, password } = this.state;
        if (email && password){
            login(email.trim(), password.trim())
                .then((data) => {
                    console.log("logged in");
                    this.props.navigation.replace('ChatRoom')
                })
                .catch(() => {
                    alert('Invalid username or password');
                    this.setState({ loading: false })
                })
        } else {
            alert('Required username and password');
            this.setState({ loading: false })
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
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 100}>
                    {
                        <View style={styles.container} >
                            <Image style={styles.imgLogin} source={require('../../assets/logo.png')} />
                            <Text style={styles.text}>Chat App</Text>
                            <TextInput
                                autoCapitalize='none'
                                autoCompleteType="email"
                                style={styles.input}
                                value={this.state.email}
                                placeholder="email"
                                onChangeText={(email) => this.setState({ email })}
                            />
                            <TextInput
                                style={styles.input}
                                value={this.state.password}
                                autoCompleteType="off"
                                placeholder="password"
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry />

                            <View style={{ width: 1000, marginBottom : 18 }} />

                            {this.state.loading ? <Text>Loading...</Text> :
                                <View style={styles.buttonLayout} >
                                    <TouchableOpacity
                                        title="Login"
                                        onPress={this.login}>
                                        <Text style={styles.buttonCute}>Login</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 10, marginBottom : 18 }} />
                                    <TouchableOpacity
                                        title="Register"
                                        onPress={() => { this.props.navigation.navigate('Register') }}>
                                        <Text style={styles.buttonCute}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    }
                </KeyboardAvoidingView>
            </Container>
        )
    }
}

export default LoginScreen