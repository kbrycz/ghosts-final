
import React from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

// {
//     id: i,
//     subs: ['Lions', 'Bears', 'Packers', 'Chiefs', 'Patriots', 'Rams', 'Chargers', 'Giants'],
//     topic: 'NFL Teams',
//     userCompleted: false
// }

const PremadeItemComponent = ({set, selectSet}) => {

    // Makes it so the top item has a border
    const containerStyle = (id) => {
        if (id === 0) {
            return {
                borderTopWidth: 1,
            }
        }
    }

    // Gets the difficulty icon for the pack
    const getDifficulty = () => {
        if (set.diff === 0) {
            return <Text style={styles.diff}>(E)</Text>
        }
        else if (set.diff === 1) {
            return <Text style={styles.diff}>(M)</Text>
        }
        else {
            return <Text style={styles.diff}>(H)</Text>
        }
    }

    return (
        <View style={[styles.container, containerStyle(set.id)]}>   
            {getDifficulty()}         
            <TouchableOpacity 
            onPress={() => selectSet(set)}
            style={styles.wordContainer}>
                <Text style={styles.word}>{set.title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:  Dimensions.get('window').height * .02,
        borderBottomWidth: 1,
        borderColor: 'rgba(144, 156, 216, .1)',
        flexDirection: 'row'
    }, 
    wordContainer: {
        flex: 2,
    },
    word: {
        color: '#dbdff2',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
    },
    diff: {
        flex: 1,
        fontSize: Dimensions.get('window').height * .02,
        color: '#dbdff2',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .009,
        fontFamily: 'PatrickHand',
    }

})

export default PremadeItemComponent