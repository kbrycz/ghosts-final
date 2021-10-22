import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image} from 'react-native'
import * as Color from '../../../global/Color'

const VotedOutComponent = ({player, moveToScreen, isGhost}) => {

    return (
        <View>
            <Text style={styles.word}>{player.name}...</Text>
            <Text style={styles.p}>
                The rest of the party has chosen to eliminate you... I'm sorry, but you can no longer speak or vote!
            </Text>
            {
                isGhost
                ? <TouchableOpacity onPress={() => moveToScreen(1)}>
                        <Text style={styles.playButton}>Continue</Text>
                    </TouchableOpacity>
                : <TouchableOpacity onPress={() => moveToScreen(0)}>
                        <Text style={styles.playButton}>Continue</Text>
                  </TouchableOpacity>
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
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
        fontSize: Dimensions.get('window').height * .07,
        lineHeight: Dimensions.get('window').height * .1,
        fontFamily: 'PatrickHand'
    },
    p: {
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
    playButton: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .15,
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

export default VotedOutComponent