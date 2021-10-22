import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator} from 'react-native'
import * as Color from '../../../global/Color'

const EndComponent = ({topic, isCorrect, ghostsWin, returnHome, rejoinLobby}) => {

    // Renders what the winning paragraph is depending on player side
    const renderParagraph = () => {
        if (ghostsWin && isCorrect) {
            return  <Text style={styles.counter}>
                        The topic was *{topic}*. The ghosts win the game by a landslide! Better luck next time humans.
                    </Text>
        }
        else if (ghostsWin && !isCorrect) {
            return  <Text style={styles.counter}>
                        The topic was *{topic}*. The ghosts already won the game anyway. Better luck next time humans.
                    </Text>
        }
        else if (!ghostsWin && isCorrect) {
            return  <Text style={styles.counter}>
                        The topic was *{topic}*. The ghosts won the game off their guess! Better luck next time humans.
                    </Text>
        }
        else {
            return  <Text style={styles.counter}>
                        The topic was *{topic}*. The Humans win! Great job protecting your topic!
                    </Text>
        }
    }

    return (
        <View>
            <Text style={styles.title}>The ghosts guessed...</Text>
            {
                isCorrect
                ? <Text style={styles.word}>Correctly!</Text>
                : <Text style={styles.word}>Incorrectly!</Text>
            }
            {renderParagraph()}
            <TouchableOpacity onPress={returnHome}>
                <Text style={styles.playButton}>Leave</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        marginBottom: Dimensions.get('window').height * .05,
    },
    title: {
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        marginTop: Dimensions.get('window').height * .1,
        paddingTop: Dimensions.get('window').height * .01,
        textAlign: 'center',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .04,
        lineHeight: Dimensions.get('window').height * .08,
        fontFamily: 'PatrickHand'
    },
    counter: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .02,
        marginBottom: Dimensions.get('window').height * .08,
        textAlign: 'justify',
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .025,
        lineHeight: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
    word: {
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        marginTop: Dimensions.get('window').height * .05,
        marginBottom: Dimensions.get('window').height * .05,
        paddingTop: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 5,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .07,
        lineHeight: Dimensions.get('window').height * .1,
        fontFamily: 'PatrickHand'
    },
    playButton: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
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

})

export default EndComponent