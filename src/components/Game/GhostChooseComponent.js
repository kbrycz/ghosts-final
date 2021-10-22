
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, Dimensions, View, TouchableOpacity, FlatList, SafeAreaView, Alert} from 'react-native'
import PlayerVotingComponent from './PlayerVotingComponent'
import * as Color from '../../../global/Color'

const GhostChooseComponent = ({isWatching, titleText, players, votesNeeded, votedId, updateVotedId, isDead, isGhost, word, localPlayerId, isPlayerRound}) => {

    // Render what the bottom of the lobby looks like
    const renderBottom = () => {
        if (isWatching) {
            return <Text style={styles.word}>You are the host</Text>
        }
        else if (isGhost) {
            return <Text style={styles.word}>You are a *Ghost*</Text>
        }
        else {
            return <Text style={styles.word}>Your word is *{word}*</Text>
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{titleText}</Text>
            </View>
            <FlatList
                data={players}
                renderItem={({ item }) => (
                <PlayerVotingComponent isWatching={isWatching} votedId={votedId} updateVotedId={updateVotedId} isGhost={isGhost} isDead={isDead} 
                votesNeeded={votesNeeded} player={item} localPlayerId={localPlayerId} isPlayerRound={isPlayerRound} />
                )}
                keyExtractor={item => item.id.toString()}
                style={styles.list} />
            {renderBottom()}
            
        </View>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    headerContainer: {
        borderBottomWidth: 3,
        borderColor: 'rgba(144, 156, 216, .2)',
    },
    header: {
        width: Dimensions.get('window').width,
        padding: Dimensions.get('window').height * .03,
        marginBottom: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .04,
        lineHeight: Dimensions.get('window').height * .06,
        fontFamily: 'PatrickHand',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    word: {
        color: Color.TEXT,
        marginTop: Dimensions.get('window').height * .05,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },
    container: {
        marginTop: Dimensions.get('window').height * .06,
        marginBottom: Dimensions.get('window').height * .4,
    },
    list: {
        height: Dimensions.get('window').height * .5,
        borderBottomWidth: 3,
        borderColor: 'rgba(144, 156, 216, .2)',
    },

})

export default GhostChooseComponent