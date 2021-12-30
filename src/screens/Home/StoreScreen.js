import React from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/General/CircleComponent'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import StoreItemComponent from '../../components/Home/StoreItemComponent'

class StoreScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            gamePacks: [],
        }
    }

    // componentDidMount() {
    //     this.getGamePacks()
    // }

    // // Gets the game packs
    // getGamePacks = () => {
    //     let gps = []

    //     let gp1 = {
    //             id: 0,
    //             isBought: false, 
    //             title: 'Phantom Word Pack',
    //             count: 8,
    //             gameSets: [],
    //             price: '$1.99',
    //         }
    //     gps.push(gp1)
    //     this.setState({gamePacks: gps, loadingContent: false})
    // }

    // // User purchases game pack
    // purchaseGamePack = (id) => {
    //     console.log("purchasing game pack " + id)
    // }


    render() {
        return (
            <View>
                <CircleComponent />
                <Text style={styles.headerText}>Sorry!</Text>
                <Text style={styles.subText}>We currently have no expansion packs available 
                                             in our store! Come back soon!</Text>
                {/* <Text style={styles.headerText}>Store</Text> */}
                {/* <ScrollView style={styles.scroll}>

                    {
                        this.state.gamePacks.map((pack, index) => {
                            return <StoreItemComponent key={index} gamePack={pack} purchaseGamePack={this.purchaseGamePack} /> 
                        })
                    }
                    <Text style={styles.description}>Only one person has to buy per group! Have the person who purchased be the host and everyone will be able to play!</Text>
                </ScrollView> */}
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    headerText: {
        marginTop: Dimensions.get('window').height * .1,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .05,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
    subText: {
        marginTop: Dimensions.get('window').height * .05,
        marginLeft: Dimensions.get('window').width * .12,
        marginRight: Dimensions.get('window').width * .12,
        marginBottom: Dimensions.get('window').height * .03,
        lineHeight: Dimensions.get('window').height * .05,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .03,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
    scroll: {
        marginBottom: Dimensions.get('window').height * .1,
        marginTop: Dimensions.get('window').height * .03,
        height: Dimensions.get('window').height
    },
    description: {
        marginTop: Dimensions.get('window').height * .02,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height * .015,
        color: Color.MAIN,
        fontFamily: 'PatrickHand'
    },
})

export default StoreScreen