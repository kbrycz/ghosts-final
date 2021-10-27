import React from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/General/CircleComponent'

class AboutScreen extends React.Component {

    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <CircleComponent />
                <Text style={styles.headerText}>About</Text>
                <Text style={styles.version}>1.0.2</Text>
                <Text style={styles.p}>Alligator Games LLC is dedicated to providing you with all sorts of games and apps to bring your group closer together! 
                                        Before your next party gets dull, come check out what we have to offer!</Text>
                <Text style={styles.p}>"Ghosts" is our first game to be released to the app store! 
                                        To view more of our work, check out our website: https://alligator.games!</Text>
                <Text style={styles.p}>More games are on the way! Keep an eye out for our releases!</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: Dimensions.get('window').height * .1,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        lineHeight: Dimensions.get('window').height * .08,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .06,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
    version: {
        marginTop: Dimensions.get('window').height * .005,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .035,
        color: Color.MAIN,
        marginBottom: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
    p: {
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .04,
        textAlign: 'justify',
        fontSize: Dimensions.get('window').height * .025,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
    
})

export default AboutScreen