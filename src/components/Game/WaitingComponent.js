import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator} from 'react-native'
import * as Color from '../../../global/Color'

const WaitingComponent = ({isWatching, word, isGhost, moveToScreen, isDead}) => {

    // renders host view, player view, and ghost view
    const renderElements = () => {
        if (isWatching) {
            return (
                <>
                    <Text style={styles.title}>You are the</Text>
                    <Text style={styles.word}>Host</Text>
                    <Text style={styles.counter}>
                        You will just be observing this game. You will be able to see what the ghosts see. Click the button below to see what the ghosts are voting!
                    </Text>
                    <TouchableOpacity onPress={() => moveToScreen(1)}>
                        <Text style={styles.playButton}>Go</Text>
                    </TouchableOpacity>
                </>
            )
        }
        else {
            return (
                <>
                    {
                        isGhost
                        ? <>
                        <Text style={styles.title}>You are a</Text>
                        <Text style={styles.word}>{word}</Text>
                        {
                            isDead
                            ? <>
                                <ActivityIndicator
                                style={styles.activityIndicator}
                                animating={true}
                                size="large"
                                color={Color.TEXT}
                                />
                            <Text style={styles.counter}>
                                You are dead. You are no longer allowed to talk, but you can listen! See if you can try to piece together what the topic might be! 
                                The ghosts are currently choosing a starting player
                            </Text>

                            </>
                            : <>
                                <Text style={styles.counter}>
                                    You and the other ghosts must now vote for a player to start! The humans are being told to 
                                    close their eyes and wait for a sound! (Put your ringer on!)
                                </Text>
                                <TouchableOpacity onPress={() => moveToScreen(1)}>
                                    <Text style={styles.playButton}>Ready</Text>
                                </TouchableOpacity>
                            </>
                        }
                        
                        </>
                        : <>
                        <Text style={styles.title}>Your word is:</Text>
                        <Text style={styles.word}>{word}</Text>
                        {
                            isDead
                            ? <>
                            <ActivityIndicator
                            style={styles.activityIndicator}
                            animating={true}
                            size="large"
                            color={Color.TEXT}
                            />
                            <Text style={styles.counter}>
                                You are dead. You are no longer allowed to speak or contribute to the game!
                                You are now waiting for the ghosts to choose who they would like to start the round!
                            </Text>
                            </>
                            : <>
                            <ActivityIndicator
                            style={styles.activityIndicator}
                            animating={true}
                            size="large"
                            color={Color.TEXT}
                            />
                            <Text style={styles.counter}>
                                Waiting for the ghosts to choose who they would like to start the round!
                                Try to think of some clues in the meantime! Close your eyes and wait for a sound to wake you up! (Make sure your ringer is on!)
                            </Text>
                            </>
                        }
                        
                        </>

                    }
                        
                </>
            )
        }
    }

    return (
        <View>
            {renderElements()}
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
        fontSize: Dimensions.get('window').height * .04,
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
        fontSize: Dimensions.get('window').height * .022,
        lineHeight: Dimensions.get('window').height * .045,
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
        textShadowRadius: 10,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .06,
        lineHeight: Dimensions.get('window').height * .08,
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