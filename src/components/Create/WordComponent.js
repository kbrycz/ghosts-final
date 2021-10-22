import React, {useState} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import SimpleModalComponent from '../Modal/SimpleModalComponent'
import * as Color from '../../../global/Color'

const WordComponent = ({topic, setTopic, nextPage}) => {

    const key = Platform.OS === 'ios' ? 'done' : 'next'
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

    // Continue on to next page if topic is good
    const continueButton = () => {
        if (topic.length < 2) {
            setText('Topic is too short. Make it at least 2 characters.')
            setModalVisible(true)
        } else {
            nextPage()
        }
    }

    return (
        <>
            <Text style={styles.title}>Choose a topic</Text>
            <TextInput
            autoCapitalize="characters"
            autoCompleteType='off'
            autoCorrect={false}
            maxLength={16}
            style={styles.textInput}
            returnKeyType={key}
            value={topic.toString()}
            onChangeText={setTopic}
            placeholder="topic..."
            />
            <Text style={styles.paragraph}>Hint: Try to make it as broad and short as possible. Some example categories are "Cereal" or "NFL Teams".</Text>
            <SimpleModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} text={text} buttonText={'OK'} />
            <View>
                <TouchableOpacity onPress={continueButton}>
                    <Text style={styles.playButton}>Continue</Text>
                </TouchableOpacity>  
            </View>      
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
        color: '#242f67',
        fontSize: Dimensions.get('window').height * .028,
        letterSpacing: 5,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#242f67',
        borderRadius: 10,
        backgroundColor:'#dbdff3',
        paddingTop: Dimensions.get('window').height * .02,
        paddingBottom: Dimensions.get('window').height * .02,
        fontFamily: 'PatrickHand',
    },
})

export default WordComponent