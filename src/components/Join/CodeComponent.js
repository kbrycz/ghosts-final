import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, Alert} from 'react-native'
import * as Color from '../../../global/Color'
import CodeBoxComponent from './CodeBoxComponent'

const CodeComponent = ({checkRoomName}) => {

    const [code, setCode] = useState('')

    return (
        <>
            <Text style={styles.title}>Enter the Game Code</Text>
            <CodeBoxComponent setValue={setCode} value={code} />
            <Text style={styles.paragraph}>Don't have a code? Someone has to create a game first! They will see a code when the game is created!</Text>
            <View>
                <TouchableOpacity onPress={() => checkRoomName(code)}>
                    <Text style={styles.playButton}>Join</Text>
                </TouchableOpacity> 
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    playButton: {
        width: Dimensions.get('window').width * .8,
        marginTop: Dimensions.get('window').height * .02,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        color: Color.MAIN,
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: Dimensions.get('window').width * .01,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Color.TEXT,
        borderRadius: 10,
        backgroundColor: Color.TEXT,
        padding: Dimensions.get('window').height * .01,
        paddingBottom: Dimensions.get('window').height * .02,
        overflow: 'hidden',
        fontFamily: 'PatrickHand'
    },
    title: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .1,
        marginBottom: Dimensions.get('window').height * .1,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        letterSpacing: Dimensions.get('window').height * .01,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .045,
        fontFamily: 'PatrickHand'
    },
    paragraph: {
        marginTop: Dimensions.get('window').height * .04,
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .1,
        textAlign: 'justify',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .025,
        fontFamily: 'PatrickHand',
        lineHeight: Dimensions.get('window').height * .04
    },

})

export default CodeComponent