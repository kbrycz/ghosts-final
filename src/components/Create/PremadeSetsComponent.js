import React from 'react'
import {View, StyleSheet, Text, FlatList, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import PremadeItemComponent from './PremadeItemComponent';
import * as Color from '../../../global/Color'

const PremadeSetsComponent = ({premadeSets, selectSet}) => {

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
                <View style={styles.iconView}>
                    <TouchableOpacity >
                        <FontAwesome5 name="store" style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Feather name="book-open" style={styles.icon} />
                    </TouchableOpacity>
                </View>
        </View>

    )
}

const styles = StyleSheet.create({

    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width * .5,
        marginLeft: Dimensions.get('window').width * .25,
        marginRight: Dimensions.get('window').width * .25,
        marginTop: Dimensions.get('window').height * .04,
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
        fontFamily: 'NewTegomin',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    container: {
        marginTop: Dimensions.get('window').height * .07,
        marginBottom: Dimensions.get('window').height * .25,

    }
})

export default PremadeSetsComponent
