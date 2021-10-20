import React, {useState} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import SimpleModalComponent from '../Modal/SimpleModalComponent'
import * as Color from '../../../global/Color'
import HideKeyboard from '../General/HideKeyboard'

const GhostGuessComponent = ({guess, setGuess, ghostSubmitGuess, topic}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

    // Makes sure that user has submitted a guess before continuing
    const continueButton = () => {
        if (guess.length < 1) {
            setText('Make sure to guess something before continuing!')
            setModalVisible(true)
        } else {
            ghostSubmitGuess()
        }
    }

    // Counts the number of words in a string
    const countWords = (str) => {
        str = str.replace(/(^\s*)|(\s*$)/gi,"");
        str = str.replace(/[ ]{2,}/gi," ");
        str = str.replace(/\n /,"\n");
        return str.split(' ').length;
     }

    return (
        <HideKeyboard>
            <View>
            <Text style={styles.title}>What do you think the topic is?</Text>
            <TextInput
            autoCapitalize="characters"
            maxLength={24}
            style={styles.textInput}
            returnKeyType={"done"}
            value={guess.toString()}
            placeholder="guess..."
            onChangeText={setGuess}
            />

            {countWords(topic) === 1
            ? <Text style={styles.question}>Hint: The topic is 1 word. Spelling counts! Don't worry about capitalization. 
                                            Say your guess out loud in case it is close enough!</Text>
            : <Text style={styles.question}>Hint: The topic is {countWords(topic)} words. Spelling counts! Don't worry about capitalization. 
                                            Say your guess out loud in case it is close enough!</Text>
            }
            <SimpleModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} text={text} buttonText={"OK"} />
            <TouchableOpacity onPress={continueButton}>
                <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
            </View>          
        </HideKeyboard>
    )
}

const styles = StyleSheet.create({
    title: {
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        marginTop: Dimensions.get('window').height * .1,
        marginBottom: Dimensions.get('window').height * .07,
        paddingTop: Dimensions.get('window').height * .01,
        textAlign: 'center',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .04,
        lineHeight: Dimensions.get('window').height * .08,
        fontFamily: 'PatrickHand'
    },
    question: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .02,
        textAlign: 'justify',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .025,
        lineHeight: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
    button: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .07,
        marginBottom: Dimensions.get('window').height * .02,
        color: Color.MAIN,
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: Dimensions.get('window').height * .005,
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
        color: '#192a56',
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#192a56',
        borderRadius: 10,
        backgroundColor: Color.TEXT,
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontFamily: 'PatrickHand'
    },


})

export default GhostGuessComponent