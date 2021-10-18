import React from 'react'
import {View, StyleSheet, SafeAreaView, Dimensions, Image, Text} from 'react-native'
import CircleComponent from '../../components/General/CircleComponent'
import * as Color from '../../../global/Color'
import BackgroundImage from '../../components/General/BackgroundImage'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import * as Global from '../../../global/Global'
import WaitingComponent from '../../components/Game/WaitingComponent'
import GhostChooseComponent from '../../components/Game/GhostChooseComponent'
import VotedOutComponent from '../../components/Game/VotedOutComponent'
import GhostGuessComponent from '../../components/Ending/GhostGuessComponent'
import WinnerComponent from '../../components/Ending/WinnerComponent'
import WaitingForOtherGhostsComponent from '../../components/Ending/WaitingForOtherGhostsComponent'
import EndComponent from '../../components/Ending/EndComponent'

class GameScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loadingContent: true,
            loading: false,
            status: 7,
            players: [],
            playersInLobby: [],
            gameData: {},
            localPlayer: {},
            votedId: -1,
            ghostVotesNeeded: 2,
            playerVotesNeeded: 2,
            chosenPlayerId: 0,
            guess: ''
        }
    }

    // Quit the game and make sure all players know
    returnHome = () => {
        console.log("return home")
    }

    // rejoin the lobby that you are in
    rejoinLobby = () => {
        console.log("rejoin the lobby")
    }

    // Temp data in order to create the waiting screens
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
        this.setState({players: players, playersInLobby: players, gameData: starterData, localPlayer: player1}, () => this.setState({loadingContent: false}))
    }

    componentDidMount() {
        this.getTempData()
    }

    // Gets the index of the player based on their id
    getIndexOfPlayer = (id) => {
        for (let i = 0; i < this.state.players.length; ++i) {
            if (id === this.state.players[i].id) {
                return i
            }
        }
        return 0
    }

    // Sets the voted id to given amount
    updateVotedId = (votedIdIn) => {
        this.setState({votedId: votedIdIn})
    }

    // Moves player to given screen
    moveToScreen = (screen) => {
        this.setState({status: screen})
    }

    // Sets the ghost's guess
    setGuess = (g) => {
        this.setState({guess: g})
    }

    // ghosts submit their guess here
    ghostSubmitGuess = () => {
        console.log("ghost is submitting guess")
    }

    // Renders all the game screens based on status
    renderGameScreens = () => {
        switch(this.state.status) {
            case 0: 
                return <WaitingComponent word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} />
            case 1:
                return (<GhostChooseComponent word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} titleText={"Who should start this round?"} votedId={this.state.votedId} updateVotedId={this.updateVotedId} 
                players={this.state.players} votesNeeded={this.state.ghostVotesNeeded} isDead={this.state.localPlayer.isDead} />)
            case 2:
                return (<GhostChooseComponent word={this.state.localPlayer.word} isGhost={!this.state.localPlayer.isGhost} titleText={`${this.state.players[this.getIndexOfPlayer(this.state.chosenPlayerId)].name} was chosen to start!`} 
                        votedId={this.state.votedId} updateVotedId={this.updateVotedId} players={this.state.players} votesNeeded={this.state.playerVotesNeeded} 
                        isDead={this.state.localPlayer.isDead} />)
            case 3: 
                return <VotedOutComponent isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} player={this.state.players[this.getIndexOfPlayer(this.state.chosenPlayerId)]}/>
            case 4:
                return <WinnerComponent ghostsWin={true} isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} />
            case 5:
                return <GhostGuessComponent guess={this.state.guess} setGuess={this.setGuess} topic={this.state.gameData.topic} ghostSubmitGuess={this.ghostSubmitGuess} />
            case 6:
                return <WaitingForOtherGhostsComponent isCorrect={true} />
            case 7:
                return <EndComponent topic={this.state.gameData.topic} isCorrect={false} ghostsWin={true} returnHome={this.returnHome} rejoinLobby={this.rejoinLobby} />
        }
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
                        {this.renderGameScreens()}
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