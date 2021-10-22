import React, {useState} from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'; 
import * as Color from '../../../global/Color'


const PlayerVotingComponent = ({isWatching, player, votesNeeded, votedId, updateVotedId, isDead, isGhost, localPlayerId, isPlayerRound}) => {

    // Makes the host have the top border
    const hostStyle1 = (id) => {
        if (id === 0) {
            return {
                borderTopWidth: 1,
            }
        }
    }

    // Dead players are faded out
    const deadStyle = (d) => {
        if (d) {
            return {
                opacity: .3
            }
        }
    }


    const renderElement = () => {
        if (player.isDead || (player.id === localPlayerId && isPlayerRound) || isWatching) {
            return (
                <View style={styles.readyContainer} />
            )
        }
        if (votedId < 0 && !isDead) {
            return (
                <TouchableOpacity onPress={() => updateVotedId(player.id, 1, votesNeeded)} style={styles.readyContainer}>
                    <Text style={styles.ready}>Vote</Text>
                </TouchableOpacity>
            )

        } else {
            if (player.id === votedId && !isDead)  {
                return (
                    <TouchableOpacity onPress={() => updateVotedId(player.id, -1, votesNeeded)} style={styles.readyContainer}>
                        <Text style={styles.ready}>Unvote</Text>
                    </TouchableOpacity>
                )
            } else {
                return <View style={styles.readyContainer} />
            }
        }
    }

    return (
        <View style={[styles.container, hostStyle1(player.id)]}>
            <View
            style={styles.wordContainer}>
                {
                    player.isGhost && isGhost
                    ? (<View style={[styles.ghostView, deadStyle(player.isDead)]}>
                         <SimpleLineIcons name="ghost" style={styles.ghost} />
                         <Text style={styles.word}>{player.name}</Text>
                       </View>)
                    : (<View style={[styles.ghostView, deadStyle(player.isDead)]}>
                        <SimpleLineIcons name="user" style={styles.ghost} />
                        <Text style={styles.word}>{player.name}</Text>
                      </View>)
                }
                {renderElement()}
                {player.isDead
                ? <Text style={[styles.waiting, deadStyle(player.isDead)]}>Dead</Text>
                : <Text style={styles.waiting}>{player.votes}/{votesNeeded}</Text>
                }
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
    ghost: {
        fontSize: Dimensions.get('window').width * .06,
        color: Color.TEXT
    },
    ghostView: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center"
    },
    word: {
        color: Color.TEXT,
        textTransform: 'capitalize',
        fontSize: Dimensions.get('window').width * .06,
        fontFamily: 'PatrickHand',
        flex: 2,
        textAlign: 'center'
    },
    readyContainer: {
        flex: 1,
    },
    ready: {
        color: Color.TEXT,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width * .05,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        backgroundColor: '#1b244e',
        borderRadius: 10,
        overflow: 'hidden',
        flex: 1,
    },
    waiting: {
        color: '#7590d7',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width * .05,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        flex: 1,
    },
    done: {
        color: '#b7c5ea',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width * .05,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
        flex: 1,
    },

})

export default PlayerVotingComponent