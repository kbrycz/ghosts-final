import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, Alert} from 'react-native'
import SimpleModalComponent from '../Modal/SimpleModalComponent'
import * as Color from '../../../global/Color'

const SaveSettingsComponent = ({saveGame}) => {

    return (
        <>
            <Text style={styles.title}>Save your changes?</Text>
            <Text style={styles.paragraph}>If you would like to save your changes to this game. Please hit the save button below before exiting this page!</Text>
            <TouchableOpacity onPress={saveGame}>
                <Text style={styles.playButton}>Save Changes</Text>
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

})

export default SaveSettingsComponent