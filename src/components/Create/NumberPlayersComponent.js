import React from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import * as Color from '../../../global/Color'
import * as Style from '../../../global/Styles'

const NumberPlayersComponent = ({nextPage, changeVal, num, title}) => {

    return (
        <>
            <Text style={styles.title}>How Many {title}?</Text>
            <Text style={styles.players}>{num}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => changeVal(1)}>
                    <AntDesign name="plus" style={styles.plus} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => changeVal(-1)}>
                    <AntDesign name="minus" style={styles.minus} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={nextPage}>
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
    players: {
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .12,
        fontFamily: 'PatrickHand',
        marginBottom: Dimensions.get('window').height * .1,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width * .2,
        marginRight: Dimensions.get('window').width * .2,
        marginBottom: Dimensions.get('window').height * .12,
        borderRadius: 10,
        overflow: 'hidden'
    },
    plus: {
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .04,
        backgroundColor: Color.PLUS_BUTTON,
        width: Dimensions.get('window').width * .3,
        textAlign: 'center',
        padding: Dimensions.get('window').height * .005,
    },
    minus: {
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .04,
        backgroundColor: Color.MINUS_BUTTON,
        borderRadius: 2,
        overflow: 'hidden',
        width: Dimensions.get('window').width * .3,
        textAlign: 'center',
        padding: Dimensions.get('window').height * .005,
    },
    playButton: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        color: '#242f67',
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: Dimensions.get('window').width * .01,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#dbdff3',
        borderRadius: 10,
        backgroundColor:'#dbdff3',
        padding: Dimensions.get('window').height * .01,
        paddingBottom: Dimensions.get('window').height * .02,
        overflow: 'hidden',
        fontFamily: 'PatrickHand'
    },


})

export default NumberPlayersComponent