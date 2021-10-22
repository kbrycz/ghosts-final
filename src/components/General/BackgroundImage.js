import React from 'react'
import {StyleSheet, ImageBackground, Dimensions} from 'react-native'

const BackgroundImage = () => {
    return (
        <ImageBackground source={require('../../../assets/background.png')} style={styles.image} />
    )
}

const styles = StyleSheet.create({
    image: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
})

export default BackgroundImage