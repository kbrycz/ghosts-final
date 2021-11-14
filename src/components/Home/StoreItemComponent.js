import React from 'react'
import {View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, Image} from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import QuitModalComponent from '../Modal/QuitModalComponent';


const StoreItemComponent = ({gamePack, purchaseGamePack}) => {

    // {
    //     id: 0,
    //     isBought: false,
    //     title: 'NFL',
    //     count: 10,
    //     gameSets: [],
    //      price: '$1.99'
    // }

    const [modalExitVisible, setModalExitVisible] = React.useState(false)

    const getPhoto = () => {
        if (gamePack.id === 0 ) {
            return <>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image} 
                    source={require('../../../assets/phantom.png')}
                    />
            </View>
            </>
        }
    }

    // Has the first container have the border
    const containerStyle = (id) => {
        if (id === 0) {
            return {
                borderTopWidth: 1,
            }
        }
    }

    return (
        <View style={[styles.container, containerStyle(gamePack.id)]}>
            {getPhoto()}
            <Text style={styles.word}>{gamePack.title}</Text>
            <Text style={styles.sub}>Includes {gamePack.count} full games!</Text>
            <Text style={styles.price}>{gamePack.price}</Text>
            <TouchableOpacity style={styles.touchContainer} onPress={() => setModalExitVisible(true)}>
                <Text style={styles.button}>Buy Now!</Text>
            </TouchableOpacity>
            <QuitModalComponent modalExitVisible={modalExitVisible} setModalExitVisible={setModalExitVisible} 
                                text={"Are you sure you want to buy " + gamePack.title + " for " + gamePack.price + "?"} 
                                func={() => purchaseGamePack(gamePack.id)} buttonText={"Buy"} />
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        marginVertical: Dimensions.get('window').height * .02,
    },
    image: {
        resizeMode: 'contain',
        marginHorizontal: Dimensions.get('window').width * .2,
        width: Dimensions.get('window').width * .6,
        height: Dimensions.get('window').height * .25,
    },
    button: {
        borderRadius: 10,
        marginLeft: Dimensions.get('window').width * .2,
        marginRight: Dimensions.get('window').width * .2,
        paddingLeft: Dimensions.get('window').width * .08,
        paddingRight: Dimensions.get('window').width * .08,
        elevation: 2,
        marginTop: Dimensions.get('window').height * .02,
        backgroundColor: "#242f67",
        paddingTop: Dimensions.get('window').width * .02,
        paddingBottom: Dimensions.get('window').width * .02,
        overflow: 'hidden',
        textAlign: 'center',
        color: '#dbdff3',
        fontSize: Dimensions.get('window').width * .04,
        fontFamily: 'PatrickHand',
      },
    price: {
        marginTop: Dimensions.get('window').height * .01,
        flex: 1,
        color: '#242f67',
        fontSize: Dimensions.get('window').width * .04,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },
    container: {
        width: Dimensions.get('window').width,
        borderBottomWidth: 1,
        borderColor: 'rgba(144, 156, 216, .2)',
        paddingVertical: Dimensions.get('window').height * .03,
    }, 
    wordContainer: {
        flex: 1,
    },
    word: {
        color: '#242f67',
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width * .06,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },

    sub: {
        marginTop: Dimensions.get('window').height * .01,
        color: '#242f67',
        fontSize: Dimensions.get('window').width * .04,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },

})

export default StoreItemComponent