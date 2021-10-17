import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator} from 'react-native'
import * as Color from '../../../global/Color'

const WaitingComponent = ({word, isGhost, moveToScreen}) => {

    return (
        <View>
        {
            isGhost
            ? <>
            <Text style={styles.title}>You are a</Text>
            <Text style={styles.word}>{word}</Text>
            <Text style={styles.counter}>
                You and the other ghosts must now vote for a player to start!
            </Text>
            <TouchableOpacity onPress={() => moveToScreen(1)}>
                <Text style={styles.playButton}>Ready</Text>
            </TouchableOpacity>
            </>
            : <>
            <Text style={styles.title}>Your Word is:</Text>
            <Text style={styles.word}>{word}</Text>
            <ActivityIndicator
                  style={styles.activityIndicator}
                  animating={true}
                  size="large"
                  color={Color.TEXT}
              />
            <Text style={styles.counter}>
                Waiting for the ghosts to choose who they would like to start the round!
                Try to think of some clues in the meantime!
            </Text>
            </>

        }
            

        </View>
        
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        marginBottom: Dimensions.get('window').height * .05,
    },
    title: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .1,
        paddingTop: Dimensions.get('window').height * .01,
        textAlign: 'center',
        color: Color.TEXT,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .05,
        lineHeight: Dimensions.get('window').height * .08,
        fontFamily: 'PatrickHand'
    },
    counter: {
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
    word: {
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        marginTop: Dimensions.get('window').height * .1,
        marginBottom: Dimensions.get('window').height * .1,
        paddingTop: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .1,
        lineHeight: Dimensions.get('window').height * .1,
        fontFamily: 'PatrickHand'
    },
    playButton: {
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

})

export default WaitingComponent