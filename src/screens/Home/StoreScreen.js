import React from 'react'
import {View, StyleSheet, Dimensions, Text} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import * as Color from '../../../global/Color'
import CircleComponent from '../../components/General/CircleComponent'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import StoreItemComponent from '../../components/Home/StoreItemComponent'

class AboutScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            gamePacks: [],
            loadingContent: true
        }
    }

    componentDidMount() {
        this.getGamePacks()
    }

    // Gets the game packs
    getGamePacks = () => {
        let gps = []

        let gp1 = {
                id: 0,
                isBought: false, 
                title: 'Intermediate Expansion Pack',
                count: 10,
                gameSets: [],
                price: '$1.99'
            }

        let gp2 = {
            id: 0,
            isBought: false, 
            title: 'Skilled Expansion Pack',
            count: 10,
            gameSets: [],
            price: '$1.99'
        }
        gps.push(gp1)
        gps.push(gp2)
        this.setState({gamePacks: gps, loadingContent: false})
    }

    // User purchases game pack
    purchaseGamePack = (id) => {
        console.log("purchasing game pack " + id)
    }


    render() {
        if (this.state.loadingContent) {
            return <LoadingIndicator loading={this.state.loadingContent} />
        }
        return (
            <View>
                <CircleComponent />
                <Text style={styles.headerText}>Sorry!</Text>
                <Text style={styles.subText}>We currently have no expansion packs available 
                                             in our store! Come back soon!</Text>

                {/* <ScrollView style={styles.scroll}>
                    <Text style={styles.headerText}>Store</Text>
                    {
                        this.state.gamePacks.map((pack, index) => {
                            return <StoreItemComponent key={index} gamePack={pack} purchaseGamePack={this.purchaseGamePack} /> 
                        })
                    }
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
        marginBottom: Dimensions.get('window').height * .03,
        lineHeight: Dimensions.get('window').height * .08,
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
        marginTop: Dimensions.get('window').height * .05,
        height: Dimensions.get('window').height
    }
})

export default AboutScreen