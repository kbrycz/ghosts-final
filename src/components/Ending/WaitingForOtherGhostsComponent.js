import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image, ActivityIndicator} from 'react-native'
import * as Color from '../../../global/Color'

const WaitingForOtherGhostsComponent = ({isCorrect}) => {

    return (
        <View>

            <Text style={styles.title}>Your guess was...</Text>
            {
                isCorrect
                ? <Text style={styles.word}>Correct!</Text>
                : <Text style={styles.word}>Wrong!</Text>
            }
            <ActivityIndicator
                style={styles.activityIndicator}
                animating={true}
                size="large"
                color={Color.TEXT}
            />
            <Text style={styles.counter}>
                Waiting for all ghosts to submit a guess! You will be transferred to the final screen when they are done!
            </Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        marginTop: Dimensions.get('window').height * .04,
        marginBottom: Dimensions.get('window').height * .08,
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


})

export default WaitingForOtherGhostsComponent