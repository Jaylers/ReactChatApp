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
        borderRadius: 18,
        paddingEnd : 5,
        paddingTop : 5,
        paddingBottom : 5,
        paddingStart: 18,
        width: '60%',
        height: 40,
        marginBottom: 10,
    },
    buttonLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonPos: {
        borderWidth: 1,
        borderRadius: 25,
        minWidth : 100,
        width : 100,
        padding : 8,
    },
    buttonCute: {
        textAlign : 'center',
        borderWidth: 1,
        borderRadius: 25,
        minWidth : 100,
        width : 100,
        padding : 8,
        color : 'green'
    },
    imgLogin : {
        width : 180,
        height : 180
    }
})