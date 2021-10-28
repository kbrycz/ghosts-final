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
                    <Text style={styles.p}>Ghosts is a multiplayer party game that works best for 4-12 players that are able to talk to one another
                                        (the same room or over a video call). 
                                        Each player will get assigned a word before the game starts. There are three different
                                        types of words that you could receive: the topic, a subtopic, or the word "ghost".</Text>
                    <Text style={styles.p}>The game consists of two teams: Humans (the topic and subtopic word holders) vs the ghosts.
                                        Nobody knows what words the other players have, so you don't know who's on your team!
                                        The ghosts' goal is to be able to guess the topic at the end or try to blend in throughout
                                        the game until they outnumber the humans. The humans must do whatever it takes to prevent either of those.</Text>
                    <Text style={styles.sub}>Gameplay</Text>
                    <Text style={styles.p}>Once every player has received their word, the game is ready to start. The topic holders do not know for sure if they have
                                        the topic word, and the subtopic word holders are not sure they don't have the topic word either! So it is important for the humans
                                        to play as if they have the topic and protect it!</Text>
                    <Text style={styles.p}>For this example, let's use the topic "Cereal". The ghosts will first see a screen that shows who the other 
                                            ghosts are. They will all vote on which player they want to start the round. The other players will have their eyes closed 
                                            so that they do not see the ghosts on their phone. They can open their eyes when they hear a sound on their phone!</Text>
                    <Text style={styles.p}>Once the ghosts vote, all players will be transferred to the same screen in which they will see the other
                                        players in the game. The player who was chosen now has to give a clue that relates to their word. Once you say your clue,
                                        you are not allowed to discuss it with other players or try to explain what you meant!</Text>
                    <Text style={styles.p}>You do not want the ghosts to easily pick up on what your word might be. The ghosts 
                                          will be listening carefully for any clues you can give them.</Text>           
                    <Text style={styles.p}>Let's say they have one of the subtopic words, "Frosted Flakes". An example clue could be, "Go tigers!", or "ROARRRR!".
                                        This player believes that it is a smart move to give a clue that relates to the cereal's tiger mascot.
                                        This clue will not only show the other players that this player is safe, but it also throws off the
                                        ghost into thinking the topic might relate to animals or sports instead of cereal!</Text>
                    <Text style={styles.p}>Now let's say that the player with the topic word "Cereal" is up. They give the clue "This goes great with milk!" 
                                          This is a horrible hint and now narrows the topic down for the ghost. The ghost can combine that clue with the clues from earlier 
                                          to blend in a lot easier.</Text>
                    <Text style={styles.p}>Eventually, it becomes the ghosts' turn. After listening to all the clues before them, they must try their best to say a clue
                                           that fits in with the others. Remember, you're not allowed to explain yourself, so you might get lucky by having one person find a relation to 
                                           the word they have.</Text>
                    <Text style={styles.p}>The rest of the players
                                        now get a turn! Once everyone has gone, everyone get to vote anonymously 
                                        to kick someone out of the game.</Text>
                    <Text style={styles.p}>If you are kicked out of the game, you are not allowed to talk or contribute in any way! DO NOT tell anyone what you were. 
                                            If you are a ghost, you are still allowed to guess 
                                            the topic at the end of the game, so you should still be listening to the clues!</Text>

                    <Text style={styles.p}>
                                        The ghosts win the game if they eliminate enough of the other humans
                                        to become a majority, or if they can guess the topic at the end of the game!</Text>

                    <Text style={styles.p}>The humans can win
                                        by eliminating all the ghosts and preventing the ghosts from guessing the topic! They must protect the topic at all costs! 
                                        So what are you waiting for! Good luck!</Text>
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