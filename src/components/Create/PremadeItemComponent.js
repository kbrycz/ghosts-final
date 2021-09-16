
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

    const containerStyle = (id) => {
        if (id === 0) {
            return {
                borderTopWidth: 1,
            }
        }
    }

    return (
        <View style={[styles.container, containerStyle(set.id)]}>
            {set.userCompleted
            ? <EvilIcons name="check" style={styles.icon} />
            : <Entypo name="new" style={styles.icon} />
            }
            
            <TouchableOpacity 
            onPress={() => selectSet(set)}
            style={styles.wordContainer}>
                <Text style={styles.word}>Dataset #{set.id + 1}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:  Dimensions.get('window').height * .02,
        borderBottomWidth: 1,
        borderColor: 'rgba(144, 156, 216, .3)',
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
        fontSize: Dimensions.get('window').width * .06,
        fontFamily: 'NewTegomin',
    },
    icon: {
        flex: 1,
        fontSize: Dimensions.get('window').width * .06,
        color: '#dbdff2',
        textAlign: 'center',
        marginTop: Dimensions.get('window').height * .009,
    }

})

export default PremadeItemComponent