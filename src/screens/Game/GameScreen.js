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
            status: 0,
            players: [],
            playersInLobby: [],
            playersAlive: 0,
            gameData: {},
            localPlayer: {},
            votedId: -1,
            ghostVotesNeeded: 0,
            playerVotesNeeded: 0,
            chosenPlayerId: 0,
            guess: '',
            ghostsWin: false,
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

    // Set the current playerVotesNeeded variable
    setPlayerVotesNeeded = (playersLength) => {

        // Makes sure the majority is correct
        let playerVotesNeededTemp = playersLength
        if (playerVotesNeededTemp % 2 === 0) {
            playerVotesNeededTemp = playerVotesNeededTemp / 2
        }
        else {
            playerVotesNeededTemp = Math.floor(playerVotesNeededTemp / 2) + 1
        }

        this.setState({
            playerVotesNeeded: playerVotesNeededTemp
        })
    }

    // Gets all of the real data from lobby screen
    getLobbyData = () => {

        this.setPlayerVotesNeeded(this.props.route.params.gameData.numPlayers)

        this.setState({
            gameData: this.props.route.params.gameData,
            players: this.props.route.params.players,
            playersInLobby: this.props.route.params.playersInLobby,
            localPlayer: this.props.route.params.localPlayer,
            ghostVotesNeeded: this.props.route.params.gameData.numGhosts,
            playersAlive: this.props.route.params.gameData.numPlayers
        }, () => {
            this.setState({
                loadingContent: false
            })
        })
    }

    componentDidMount() {
        // this.getTempData()
        this.getLobbyData()
        this.socketFunctions()
    }

    // All socket functions
    socketFunctions = () => {
        Global.socket.on('updatePlayers', (players) => {
            console.log("updating the players array from host (host not included)")
            this.setState({
                players: players
            })
        })

        Global.socket.on('votingFinished', (startingPlayerId) => {
            console.log("This player has been picked: " + startingPlayerId)

            // Set localplayer to dead if they are dead
            if (this.state.localPlayer.id === startingPlayerId && this.state.status === 2) {
                this.state.localPlayer.isDead = true
            }

            // Reset all of the voting data
            let tempPlayers = this.state.players
            for (let i = 0; i < tempPlayers.length; ++i) {
                tempPlayers[i].votes = 0

                // Set voted player to dead
                if (tempPlayers[i].id === startingPlayerId && this.state.status === 2) {
                    tempPlayers[i].isDead = true
                    if (this.playerEliminated(tempPlayers[i].isGhost)) {
                        console.log("Game is over, resetting variables.")
                        this.setState({
                            votedId: -1,
                            players: tempPlayers,
                        })
                        return 
                    }
                }
            }
            console.log("Game is continuing on. Sending player to voted off screen")
            this.setState({
                votedId: -1,
                players: tempPlayers,
                chosenPlayerId: startingPlayerId,
                status: this.state.status === 2 ? 3 : 2
            })
        })

        // this.state.socket.on('ghostsGuessedRight', () => {
        //     console.log("One of the ghosts Guessed Right, they win!")
        //     this.setState({
        //         status: 9,
        //         ghostsWin: true,
        //         ghostsGuessedRight: true
        //     })
        // })
        // this.state.socket.on('ghostsGuessedWrong', () => {
        //     console.log("All of the ghosts Guessed Right, players win!")
        //     this.setState({
        //         status: 9,
        //         ghostsWin: false
        //     })
        // })
        // this.state.socket.on('ghostsGuessed', (obj) => {
        //     console.log("One of the ghosts Guessed wrong")
        //     this.setState({
        //         ghostsGuessed: obj.ghostsGuessed,
        //     })
        // })
    }

    // Updates necessary variables for when a player is killed. 
    // Returns true if game continues, false if game is over
    playerEliminated = (isGhost) => {
        let isOver = false
        this.setState({
            ghostVotesNeeded: isGhost ? this.state.ghostVotesNeeded - 1 : this.state.ghostVotesNeeded,
            playersAlive: this.state.playersAlive - 1
        }, () => {
            this.setPlayerVotesNeeded(this.state.playersAlive)
            
            // Check if all ghosts have been eliminated
            if (this.state.ghostVotesNeeded <= 0) {
                this.setState({
                    ghostsWin: false,
                    status: 4
                })
                isOver = true
            }
            // Check if ghosts have a majority
            else if (this.ghostsHaveMajority()) {
                this.setState({
                    ghostsWin: true,
                    status: 4
                })
                isOver = true
            }
        })
        return isOver
    }

    // Figures out of ghosts have the majority
    ghostsHaveMajority = () => {
        let majorityAmount = 0
        if (this.state.playersAlive % 2 === 0) {
            majorityAmount = this.state.playersAlive / 2
        }
        else {
            majorityAmount = Math.floor(this.state.playersAlive / 2) + 1
        }
        if (this.state.ghostVotesNeeded >= majorityAmount) {
            console.log("Ghosts have reached majority")
            return true
        }
        else { 
            console.log("Game continues. Ghosts don't have majority")
            return false
        }
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

    // Gets the index of the player based on their id
    getIndexOfPlayer = (id) => {
        for (let i = 0; i < this.state.players.length; ++i) {
            if (id === this.state.players[i].id) {
                return i
            }
        }
        return 0
    }

    // Updates the votedIds in the ghost and normal rounds
    updateVotedId = (i, amount, votesNeeded) => {
        let tempPlayers = this.state.players
        if (amount  < 0) {
            this.setState({
                votedId: -1
            })
        } else {
            this.setState({
                votedId: i
            })
        }
        
        // update the amount of votes for player
        let index = this.getIndexOfPlayer(i)
        tempPlayers[index].votes = tempPlayers[index].votes + amount

        this.setState({
            players: tempPlayers
        }, () => {
            if (this.state.players[index].votes === votesNeeded) {
                // Starting player/voted player was found, so need to reset all voting stuff
                const obj = {code: this.state.gameData.code, startingPlayerId: i}
                Global.socket.emit('votingFinished', obj)
            }
            else {
                // send the new players array to the server
                const obj = {code: this.state.gameData.code, players: this.state.players}
                Global.socket.emit('updateVote', obj)
            }
        });
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
                return (<GhostChooseComponent word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} titleText={`${this.state.players[this.getIndexOfPlayer(this.state.chosenPlayerId)].name} was chosen to start!`} 
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