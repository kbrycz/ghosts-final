import React from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native'


const PlayerListComponent = ({player, readyUp, localPlayerId}) => {

    // Allows for the host style to have the border
    const hostStyle1 = (isHost) => {
        if (isHost) {
            return {
                borderTopWidth: 1,
            }
        }
    }

    // Render the ready up button component
    const renderElements = () => {
        // If player is the local player
        if (player.id === localPlayerId) {
            if (player.isReady) {
                return <Text style={styles.done}>Ready</Text>
            } else {
                return (
                    <TouchableOpacity onPress={() => readyUp(player.id)} style={styles.readyContainer}>
                        <Text style={styles.ready}>Ready up</Text>
                    </TouchableOpacity>
                )
            }
        } else {
            if (player.isReady) {
                return <Text style={styles.done}>Ready</Text>
            } else {
                return <Text style={styles.waiting}>Waiting</Text>
            }
        }
    }

    return (
        <View style={[styles.container, hostStyle1(player.isHost)]}>
            <View
            style={styles.wordContainer}>
                {
                    player.isHost
                    ? <Text style={styles.word}>{player.name} (Host)</Text>
                    : <Text style={styles.word}>{player.name}</Text>
                }
                { renderElements() }
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:  Dimensions.get('window').height * .02,
        borderBottomWidth: 1,
        borderColor: 'rgba(144, 156, 216, .3)',
    }, 
    wordContainer: {
        flexDirection: 'row'
    },
    word: {
        color: '#dee5f5',
        textTransform: 'capitalize',
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        flex: 2,
        textAlign: 'center'
    },
    readyContainer: {
        flex: 1,
    },
    ready: {
        color: '#dbdff2',
        textTransform: 'uppercase',
        paddingTop: Dimensions.get('window').height * .002,
        fontSize: Dimensions.get('window').height * .025,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        backgroundColor: '#1b244e',
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
    },
    waiting: {
        color: '#8390d4',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        flex: 1,
    },
    done: {
        color: '#8390d4',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        flex: 1,
    },

})

export default PlayerListComponent