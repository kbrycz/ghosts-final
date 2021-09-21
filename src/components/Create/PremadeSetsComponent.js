import React from 'react'
import {View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import PremadeItemComponent from './PremadeItemComponent';
import * as Color from '../../../global/Color'

const PremadeSetsComponent = ({premadeSets, selectSet, goToStore}) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Premade Sets</Text>
            </View>
            <FlatList
                data={premadeSets}
                renderItem={({ item }) => (
                    <PremadeItemComponent set={item} selectSet={selectSet} />
                )}
                keyExtractor={item => item.id.toString()}
                style={styles.list} />
                <TouchableOpacity style={styles.storeButtonView} onPress={goToStore}>
                    <Text style={styles.storeButton}>Buy more sets here!</Text>
                </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({

    storeButtonView: {
        marginTop: Dimensions.get('window').height * .04,
    },
    storeButton: {
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },
    icon: {
        fontSize: Dimensions.get('window').height * .03,
        color: '#dbdff3',
    },
    headerContainer: {
        borderBottomWidth: 3,
        borderColor: 'rgba(144, 156, 216, .2)',
    },
    list: {
        borderBottomWidth: 3,
        borderColor: 'rgba(144, 156, 216, .2)',
        height: Dimensions.get('window').height * .6,
    },
    header: {
        width: Dimensions.get('window').width,
        padding: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: '#dbdff3',
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        letterSpacing: Dimensions.get('window').width * .01,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .04,
        fontFamily: 'PatrickHand',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    container: {
        marginTop: Dimensions.get('window').height * .07,
        marginBottom: Dimensions.get('window').height * .25,

    }
})

export default PremadeSetsComponent
