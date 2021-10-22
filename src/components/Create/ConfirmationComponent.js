import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, Alert} from 'react-native'
import SimpleModalComponent from '../Modal/SimpleModalComponent'
import * as Color from '../../../global/Color'

const ConfirmationComponent = ({gameFunction, currentPlayerName, updateCurrentPlayerName, text}) => {
    
    const key = Platform.OS === 'ios' ? 'done' : 'next' 

    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('');

    // Sends the player to the lobby
    const goToLobby = () => {
        if (currentPlayerName.length > 1) {
            gameFunction()
        } else {
            setModalText('Player name is too short. Make sure it is at least 2 characters.')
            setModalVisible(true)
        }
    }

    return (
        <>
            <Text style={styles.title}>Ready to Play?</Text>
            <TextInput
                autoCompleteType='off'
                autoCorrect={false}
                autoCapitalize="characters"
                maxLength={8}
                style={styles.textInput}
                returnKeyType={key}
                value={currentPlayerName}
                placeholder="name..."
                onChangeText={updateCurrentPlayerName} />
            <Text style={styles.paragraph}>{text}</Text>

            <SimpleModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} text={modalText} buttonText={"OK"} />
            <TouchableOpacity onPress={goToLobby}>
                <Text style={styles.playButton}>continue</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
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
        fontSize: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
    paragraph: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .09,
        marginTop: Dimensions.get('window').height * .015,
        textAlign: 'justify',
        color: Color.TEXT,
        letterSpacing: Dimensions.get('window').height * .002,
        fontSize: Dimensions.get('window').height * .024,
        lineHeight: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
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
    textInput: {
        marginBottom: Dimensions.get('window').height * .07,
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        color: Color.MAIN,
        fontSize: Dimensions.get('window').height * .028,
        letterSpacing: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Color.MAIN,
        borderRadius: 10,
        backgroundColor: Color.TEXT,
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontFamily: 'PatrickHand',
    },

})

export default ConfirmationComponent