import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        padding: 20,
        fontSize: 28,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5,
        width: '60%',
        height: 40,
        marginBottom: 10,
    },
    buttonLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonCute : {
        borderRadius: 25,
        minWidth : 100,
        width : 55
    },
    imgLogin : {
        width : 200,
        height : 200
    }
})