import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator} from 'react-native'
import * as Color from '../../../global/Color'

const WinnerComponent = ({isWatching, ghostsWin, isGhost, moveToScreen}) => {


    // Renders the text for who won
    const renderWinStatus = () => {
        if (ghostsWin) {
            return (<><Text style={styles.title}>Congratulations to the...</Text>
                <Text style={styles.word}>Ghosts!</Text></>)
        }
        else {
            return (<><Text style={styles.title}>Congratulations to the...</Text>
                <Text style={styles.word}>Humans!</Text></>)
        }
    }

    // Allows host on created game to see what humans see
    const switchToHuman = () => {
        if (isWatching || !isGhost) {
            return false
        }
        return true
    }

    return (
        <View>
            {renderWinStatus()}
        {
            switchToHuman()
            ? <>
            {ghostsWin
            ? <Text style={styles.counter}>
                    The ghosts have the majority and therefore win the game! Now it is time to really rub it in. 
                    See if you can guess the topic!
              </Text>
            : <Text style={styles.counter}>
                    All of the ghosts have been eliminated. The game is not over though. 
                    You and your fellow ghosts get to guess the topic to steal the win!
              </Text>
            }
            
            <TouchableOpacity onPress={() => moveToScreen(5)}>
                <Text style={styles.playButton}>Guess</Text>
            </TouchableOpacity>
            </>
            : <>
            <ActivityIndicator
                  style={styles.activityIndicator}
                  animating={true}
                  size="large"
                  color={Color.TEXT}
              />
            {ghostsWin
            ? <Text style={styles.counter}>
                    The ghosts have the majority and therefore win the game! The ghosts are now attempting to guess 
                    the topic to really rub it in. Better luck next time!
              </Text>
            : <Text style={styles.counter}>
                All the ghosts have been eliminated. The ghosts now get to guess what the topic was. 
                Let's hope you didn't give it away too easily!
            </Text>
            }

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

export default WinnerComponent