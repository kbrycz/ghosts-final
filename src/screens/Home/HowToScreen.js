import React from 'react'
import {View, StyleSheet, ScrollView, Dimensions, Image, Text} from 'react-native'
import CircleComponent from '../../components/General/CircleComponent'
import * as Color from '../../../global/Color'

class HowToScreen extends React.Component {

    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <CircleComponent />
                <ScrollView style={{marginBottom: Dimensions.get('window').height * .1, marginTop: Dimensions.get('window').height * .05}}>
                    <Text style={styles.headerText}>How to Play</Text>
                    <Text style={styles.sub}>Overview</Text>
                    <Text style={styles.p}>Ghosts is a multiplayer party game that works best for players in the same room. 
                                        Each player will get assigned a word before the game starts. There are three different
                                        types of words that you could receive: the topic, a subtopic, or the word "ghost".</Text>
                    <Text style={styles.p}>The game consists of two teams: the topic and subtopic word holders vs the ghosts.
                                        Nobody knows what words the other players have, so you don't know who's on your team!
                                        The ghosts' goal is to be able to guess the topic at the end while also blending in throughout
                                        the game.</Text>
                    <Text style={styles.sub}>Gameplay</Text>
                    <Text style={styles.p}>Once every player has received their word, the game is ready to start. For this example,
                                        let's use a topic of "Cereal". The ghosts will first see a screen that shows who the other 
                                        ghosts are. They will all vote on which player they want to start the round.</Text>
                    <Text style={styles.p}>Once the majority votes, all players will be transferred to the same screen in which they will see all other
                                        players in the game. The player who was chosen now has to give a clue that relates to their word.</Text>
                    <Text style={styles.p}>Let's say they have one of the subtopic words, "Frosted Flakes". An example clue could be, "Go tigers!", or "ROARRRR!".
                                        This player believes that it is a smart move to give a clue that relates to the cereal's tiger mascot.
                                        This clue will not only show the other players that this player is safe, but it also throws off the
                                        ghost into thinking the topic might relate to animals instead of cereal!</Text>
                    <Text style={styles.p}>The rest of the players
                                        now get a turn! Once everyone has gone, all of the other characters get to vote anonymously 
                                        to kick someone out of the game. The ghosts win the game if they eliminate enough of the other players
                                        to become a majority, or if they can guess the topic at the end of the game!</Text>
                    <Text style={styles.p}>The other team can win
                                        by eliminating all the ghosts and if the ghosts are not able to guess the topic! So what are you waiting
                                        for! Good luck!</Text>
                </ScrollView>
                
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: Dimensions.get('window').height * .05,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        marginBottom: Dimensions.get('window').height * .03,
        lineHeight: Dimensions.get('window').height * .08,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .05,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
    sub: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .025,
        color: Color.MAIN,
        marginBottom: Dimensions.get('window').height * .02,
        fontFamily: 'PatrickHand'
    },
    p: {
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .02,
        textAlign: 'justify',
        fontSize: Dimensions.get('window').height * .02,
        lineHeight: Dimensions.get('window').height * .03,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
})

export default HowToScreen