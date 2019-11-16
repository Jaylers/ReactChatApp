import React, { Component } from 'react'
import { Button } from 'react-native';
import Text from "react-native-web/dist/exports/Text";
import View from "react-native-web/dist/exports/View";
import {StackViewLayout} from "react-navigation-stack";

export default class LoginPage extends Component {

    render() {
        return (
            <View>
                <StackViewLayout>
                    <Text>This will show login page</Text>
                    <Button title="Go to Error"
                            onPress={ () => {
                                this.props.navigation.navigate('ErrorPage')
                            }}/>
                </StackViewLayout>
            </View>
        )
    }
}
