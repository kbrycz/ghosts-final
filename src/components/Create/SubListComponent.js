
import React from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions} from 'react-native'
import { Feather } from '@expo/vector-icons'; 
import * as Color from '../../../global/Color'

const SubListComponent = ({sub, deleteSub}) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => deleteSub(sub.id)}>
                <Feather name="x-circle" style={styles.deleteButton} />
            </TouchableOpacity>
            <Text style={styles.word}>{sub.word}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft:  Dimensions.get('window').height * .02,
        paddingRight: Dimensions.get('window').height * .02,
    }, 
    word: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        color: Color.TEXT
    },
    deleteButton: {
        fontSize: Dimensions.get('window').height * .03,
        marginTop:  Dimensions.get('window').height * .008,
        marginRight: Dimensions.get('window').height * .006,
        color: Color.TEXT
    }
})

export default SubListComponent