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
import { Audio } from 'expo-av';
import SimpleModalComponent from '../../components/Modal/SimpleModalComponent'

class GameScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loadingContent: true,
            loading: false,
            status: 0,
            players: [],
            playersAlive: 0,
            gameData: {},
            localPlayer: {},
            votedId: -1,
            ghostVotesNeeded: 0,
            playerVotesNeeded: 0,
            numGhostsInLobby: 0,
            chosenPlayerId: 0,
            guess: '',
            ghostsWin: false,
            totalGhostsGuessed: 0,
            ghostsGuessRight: false,
            isCorrect: false,
            modalVisible: false,
            isGoingHome: false,
            modalText: '',
            hasGuessed: false
        }
    }

    // Quit the game and make sure all players know
    returnHome = () => {
        console.log("Returning home")
        Global.socket.disconnect()
        this.props.navigation.navigate('Home', { screen: 'Main' })
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
        this.setState({players: players, gameData: starterData, localPlayer: player1}, () => this.setState({loadingContent: false}))
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
            localPlayer: this.props.route.params.localPlayer,
            ghostVotesNeeded: this.props.route.params.gameData.numGhosts,
            playersAlive: this.props.route.params.gameData.numPlayers,
            numGhostsInLobby: this.props.route.params.gameData.numGhosts,
        }, () => {
            this.setState({
                loadingContent: false
            })
            console.log(this.state.localPlayer)
        })
    }

    // Play the alarm sound
    playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../../../assets/ghostSound.mp3')
        );
        try {
            await sound.playAsync();
        }
        catch(err) {
            console.log(err)
        }
        
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

        Global.socket.on('votingFinished', async (obj) => {
            console.log("This player has been picked: " + obj.startingPlayerId)
            this.setState({loading: this.state.localPlayer.isGhost || this.state.status === 2, players: obj.players}, () => {
                if (this.state.status !== 2) {
                    console.log("Playing sound!")
                    this.playSound()
                }
            })
            setTimeout(() => {
                // Set localplayer to dead if they are dead
                if (this.state.localPlayer.id === obj.startingPlayerId && this.state.status === 2) {
                    this.state.localPlayer.isDead = true
                }

                // Reset all of the voting data
                let tempPlayers = this.state.players
                for (let i = 0; i < tempPlayers.length; ++i) {
                    tempPlayers[i].votes = 0

                    // Set voted player to dead
                    if (tempPlayers[i].id === obj.startingPlayerId && this.state.status === 2) {
                        tempPlayers[i].isDead = true
                        if (this.playerEliminated(tempPlayers[i].isGhost)) {
                            console.log("Game is over, resetting variables.")
                            this.setState({
                                votedId: -1,
                                players: tempPlayers,
                                loading: false
                            })
                            return 
                        }
                    }
                }
                console.log("Game is continuing on. Sending player to voted off screen")

                this.setState({
                    status: this.state.status === 2 ? 3 : 2,
                    votedId: -1,
                    players: tempPlayers,
                    chosenPlayerId: obj.startingPlayerId,
                    loading: false,
                    
                })
            }, 1000);
            
        })

        Global.socket.on('ghostGuessed', (obj) => {
            console.log("One of the ghosts has guessed")
            if (obj.isRight) {
                this.setState({
                    ghostsGuessRight: true
                })
            }
            this.setState({
                totalGhostsGuessed: this.state.totalGhostsGuessed + 1,
            }, () => {
                if (this.state.totalGhostsGuessed >= this.state.numGhostsInLobby) {
                    console.log("All ghosts have guessed. Moving to winning screen.")
                    this.triggerEndGame()
                }
                else {
                    if (this.state.localPlayer.isGhost && this.state.hasGuessed) {
                        this.setState({status: 6, loading: false})
                    }
                }
            })
        })

        // Lets the lobby know that the host has ended the game
        Global.socket.on('hostEndedGame', () => {
            console.log("Host ended game, leaving lobby")
            this.setState({
                modalVisible: true,
                isGoingHome: true,
                modalText: 'The host has ended the game. Returning to lobby.'
            })
        })

        // Lets all the other players know that a player left the lobby
        Global.socket.on('playerLeftLobby', (id) => {
            console.log("Player left game. Removing the id " + id)
            let tempPlayers = []
            let isGhost = false
            for (let i = 0; i < this.state.players.length; ++i) {
                if (this.state.players[i].socketId !== id) {
                    tempPlayers.push(this.state.players[i])
                } 
                else {
                    isGhost = this.state.players[i].isGhost
                    if (isGhost) {
                        this.setState({numGhostsInLobby: this.state.numGhostsInLobby - 1})
                    }
                } 
            }
            this.setState({
                players: tempPlayers
            }, () => this.playerEliminated(isGhost))
        })
    }

    // Disconnects all of the players from the socket
    triggerEndGame = () => {
        Global.socket.disconnect()
        this.setState({
            status: 7,
            loading: false
        })
    }

    // Returns the user to the home screen when the host quits
    closeModal = () => {
        if (this.state.isGoingHome) {
            this.returnHome()
        } else {
            this.setState({modalVisible: false})
        }
        
    }

    // Make sure there are still people in the lobby
    // Check and make sure there are still ghosts/players in the lobby
    gameStillActive = () => {
        let ghostState = false
        let playerState = false
        for (let i = 0; i < this.state.players.length; ++i) {
            if (this.state.players[i].isGhost) {
                ghostState = true
            }
            else {
                playerState = true
            }
        }

        if (!ghostState && playerState) {
            this.setState({
                modalVisible: true,
                isGoingHome: true,
                modalText: 'There are no more ghosts in the lobby. Returning to main menu!'
            })
            return false
        }
        else if (ghostState && !playerState) {
            this.setState({
                modalVisible: true,
                isGoingHome: true,
                modalText: 'There are no more humans in the lobby. Returning to main menu!'
            })
            return false
        }
        else if (!ghostState && !playerState) {
            this.setState({
                modalVisible: true,
                isGoingHome: true,
                modalText: 'Not enough players to continue the game. Returning to main menu!'
            })
            return false
        }
        else {
            return true
        }
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
            if (!this.gameStillActive()) {
                return
            }

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
        let obj = {isRight: false, code: this.state.gameData.code}
        if (this.state.guess.toUpperCase() === this.state.gameData.topic.toUpperCase()) {
            // Tell everyone that the ghosts win
            obj.isRight = true
            
        }
        this.setState({
            isPlayerCorrect: obj.isRight,
            hasGuessed: true,
            loading: true
        })
        console.log("ghost is submitting guess")
        Global.socket.emit('ghostGuessed', obj)
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
                const obj = {code: this.state.gameData.code, startingPlayerId: i, players: this.state.players}
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
                return <WaitingComponent isWatching={this.state.localPlayer.isWatching} word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} isDead={this.state.localPlayer.isDead} />
            case 1:
                return (<GhostChooseComponent isWatching={this.state.localPlayer.isWatching} word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} titleText={"Who should start this round?"} votedId={this.state.votedId} updateVotedId={this.updateVotedId} 
                players={this.state.players} localPlayerId={this.state.localPlayer.id} votesNeeded={this.state.ghostVotesNeeded} isDead={this.state.localPlayer.isDead} isPlayerRound={false}/>)
            case 2:
                return (<GhostChooseComponent isWatching={this.state.localPlayer.isWatching} word={this.state.localPlayer.word} isGhost={this.state.localPlayer.isGhost} titleText={`${this.state.players[this.getIndexOfPlayer(this.state.chosenPlayerId)].name} was chosen to start!`} 
                        votedId={this.state.votedId} updateVotedId={this.updateVotedId} players={this.state.players} votesNeeded={this.state.playerVotesNeeded} 
                        isDead={this.state.localPlayer.isDead} localPlayerId={this.state.localPlayer.id} isPlayerRound={true} />)
            case 3: 
                return <VotedOutComponent isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} player={this.state.players[this.getIndexOfPlayer(this.state.chosenPlayerId)]}/>
            case 4:
                return <WinnerComponent isWatching={this.state.localPlayer.isWatching} ghostsWin={this.state.ghostsWin} isGhost={this.state.localPlayer.isGhost} moveToScreen={this.moveToScreen} />
            case 5:
                return <GhostGuessComponent guess={this.state.guess} setGuess={this.setGuess} topic={this.state.gameData.topic} ghostSubmitGuess={this.ghostSubmitGuess} />
            case 6:
                return <WaitingForOtherGhostsComponent isCorrect={this.state.isPlayerCorrect} />
            case 7:
                return <EndComponent topic={this.state.gameData.topic} isCorrect={this.state.ghostsGuessRight} ghostsWin={this.state.ghostsWin} returnHome={this.returnHome}/>
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
                    <SimpleModalComponent modalVisible={this.state.modalVisible} setModalVisible={this.closeModal} 
                                              text={this.state.modalText} buttonText={"OK"} />
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