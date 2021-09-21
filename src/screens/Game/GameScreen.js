import React from 'react'
import {View, StyleSheet, SafeAreaView, Dimensions, Image, Text} from 'react-native'
import CircleComponent from '../../components/General/CircleComponent'
import * as Color from '../../../global/Color'
import BackgroundImage from '../../components/General/BackgroundImage'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import * as Global from '../../../global/Global'

class GameScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loadingContent: true,
            loading: false
        }
    }

    getTempData = () => {
        Global.socket = {id: "123"}
        const starterData = {
            numPlayers: 4,
            numGhosts: 1,
            numSubs: 2,
            numTops: 1,
            topic: "Cheese",
            wordSet: {
                id: 0,
                subs: ['Lions', 'Bears', 'Packers', 'Chiefs', 'Patriots', 'Rams', 'Chargers', 'Giants'],
                topic: 'NFL Teams',
                userCompleted: false
            },
            code: '21312',
            hostSocketId: Global.socket.id,
            isCreated: false
        }

        let player1 = {
            id: 0,
            socketId: Global.socket.id,
            name: "Bill",
            isReady: true,
            isHost: true,
            canPlay: true,
            isGhost: true,
            word: 'Ghost',
            isTopic: false,
            votes: 0,
            isDead: false,
        }
        let player2 = {
            id: 1,
            socketId: Global.socket.id,
            name: "John",
            isReady: true,
            isHost: false,
            canPlay: true,
            isGhost: false,
            word: 'Salt',
            isTopic: false,
            votes: 0,
            isDead: false,
        }
        let player3 = {
            id: 2,
            socketId: Global.socket.id,
            name: "Steve",
            isReady: true,
            isHost: false,
            canPlay: true,
            isGhost: false,
            word: 'Pepper',
            isTopic: false,
            votes: 0,
            isDead: false,
        }
        let player4 = {
            id: 3,
            socketId: Global.socket.id,
            name: "Kyle",
            isReady: true,
            isHost: false,
            canPlay: true,
            isGhost: false,
            word: 'Condiment',
            isTopic: true,
            votes: 0,
            isDead: false,
        }
        let players = []
        players.push(player1)
        players.push(player2)
        players.push(player3)
        players.push(player4)
        this.setState({players: players, playersInLobby: players, gameData: starterData}, () => this.setState({loadingContent: false}))
    }

    componentDidMount() {
        this.getTempData()
    }

    render() {
        if (this.state.loadingContent) {
            return <LoadingIndicator loading={this.state.loadingContent} />
        }

        return (
            <>
                <BackgroundImage />
                <View style={styles.container}>
                    <LoadingIndicator loading={this.state.loading} />
                    <SafeAreaView style={styles.safe}>
                        <Text>Hello</Text>
                    </SafeAreaView>
                </View>
            </>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
    },
})

export default GameScreen