import React, {useState} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList, TextInput} from 'react-native'
import SubListComponent from './SubListComponent';
import SimpleModalComponent from '../Modal/SimpleModalComponent'
import * as Color from '../../../global/Color'

const SubComponent = ({currentSub, setCurrentSub, addToSubList, subList, subsLeft, deleteSub, topic, createSet}) => {

    const key = Platform.OS === 'ios' ? 'done' : 'next'

    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

    // Continue on to next screen
    const continueButton = () => {
        if (subsLeft > 0) {
            setText('Hold on! You still need ' + subsLeft + ' more!')
            setModalVisible(true)
        } else {
            createSet()
        }
    }

    // Try to add the sub if it is correct length
    const tryAddingToSubList = () => {
        if (subsLeft > 0 && currentSub.length > 1) {
            addToSubList()
        } else if (subsLeft > 0 && currentSub.length < 2) {
            setText('Subtopic is too short! Try making it a little longer!')
            setModalVisible(true)
        }
        else {
            setText('Too many subtopics! Delete some to add more!')
            setModalVisible(true)
        }
    }

    return (
        <>
            <Text style={styles.title}>Write some Subtopics!</Text>
            <TextInput
            autoCompleteType='off'
            autoCorrect={false}
            clearTextOnFocus={true}
            autoCapitalize="characters"
            maxLength={16}
            style={styles.textInput}
            returnKeyType={key}
            value={currentSub.toString()}
            placeholder="subtopic..."
            onChangeText={setCurrentSub}
            onSubmitEditing={tryAddingToSubList}
            />
            <View style={styles.listContainer}>
                {subList.length > 0
                ? <FlatList
                    horizontal
                    data={subList}
                    renderItem={({ item }) => (
                        <SubListComponent sub={item} deleteSub={deleteSub} />
                    )}
                    keyExtractor={item => item.id.toString()}
                    style={styles.list} 
                />
                : <Text style={styles.word}>Reminder: Keep them short!</Text>
                }
            </View>
            
            {subsLeft > 0
            ? <Text style={styles.paragraph}>You still need {subsLeft} more for the topic "{topic}"!</Text>
            : <Text style={styles.paragraph}>You're done! That's all you need for the topic "{topic}"!</Text>
            }
            <SimpleModalComponent modalVisible={modalVisible} setModalVisible={setModalVisible} text={text} buttonText={"OK"}/>
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

    listContainer: {
        marginTop: -Dimensions.get('window').height * .03,
        marginBottom: Dimensions.get('window').height * .03,
        backgroundColor: Color.DARK,
        paddingTop: Dimensions.get('window').height * .03,
        paddingBottom: Dimensions.get('window').height * .03,
    },
    
    list: {
    },
    word: {
        textAlign: 'center',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
    },

})

export default SubComponent