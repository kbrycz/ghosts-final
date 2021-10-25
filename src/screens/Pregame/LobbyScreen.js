import React from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity, Text, SafeAreaView, FlatList, Clipboard} from 'react-native'
import * as Color from '../../../global/Color'
import * as Global from '../../../global/Global'
import { Feather } from '@expo/vector-icons';
import PlayerListComponent from '../../components/Lobby/PlayerListComponent';
import BackgroundImage from '../../components/General/BackgroundImage';
import LoadingIndicator from '../../components/General/LoadingIndicator';
import QuitModalComponent from '../../components/Modal/QuitModalComponent';
import SimpleModalComponent from '../../components/Modal/SimpleModalComponent';
import HostMenuModalComponent from '../../components/Modal/HostMenuModalComponent';

class LobbyScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            loadingContent: true,
            gameData: {},
            playersInLobby: [],
            playersLeft: 0,
            localPlayer: {},
            modalExitVisible: false,
            modalMenuVisible: false,
            modalVisible: false,
            isGoingHome: false,
            hasBeenEdited: false,
            code: '',
            modalText: '',
            startingGame: false
        }
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    

    // Gets the amount of players required to join the lobby to start
    getPlayersLeft = () => {
        const totalPlayers = this.state.gameData.numPlayers
        const playersInLobbyLength = this.state.gameData.isCreated ? this.state.playersInLobby.length - 1 : this.state.playersInLobby.length
        this.setState({
            playersLeft: totalPlayers - playersInLobbyLength
        })
    }

    componentDidMount() {

        // If the screen gets focus, update the gamedata field
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("focused")
            if (this.props.route.params.isEdited && !this.state.hasBeenEdited) {
                this.setState({
                    gameData: this.props.route.params.gameData,
                    localPlayer: this.props.route.params.localPlayer,
                    hasBeenEdited: true,
                }, () => {
                    this.getPlayersLeft()
                    console.log(this.state.gameData)
                })
            }
          });

        // In case user cannot connect to the server
        Global.socket.on('error', function (err) {
            this.setState({
                loading: false,
                modalVisible: true,
                modalText: 'Unable to connect to the server. Please try again!'
            })
        });

        // Host is adding the player to their own players array and sending it to server for everyone
        Global.socket.on('hostAddPlayer', (player) => {
            console.log("Adding player " + player.name + "to lobby")
            this.setState({
                playersInLobby: [...this.state.playersInLobby, player],
                playersLeft: this.state.playersLeft - 1
            }, () => {
                const obj = {playersInLobby: this.state.playersInLobby, players: this.state.players, gameData: this.state.gameData, playersLeft: this.state.playersLeft}
                Global.socket.emit("hostUpdatePlayerToLobby", obj)
            })
        })

        // Updates the new players array with new player in it
        Global.socket.on('updatePlayersArray', (obj) => {
            console.log("Updating players arrays for all other players in the lobby when user joins")
            this.setState({
                playersInLobby: obj.playersInLobby,
                playersLeft: obj.playersLeft
            })
        })

        // Updates all users with a new players ready up sign
        Global.socket.on('updateReadyUp', (playersInLobby_in) => {
            console.log("Updating players array for a ready up")
            this.setState({
                playersInLobby: playersInLobby_in,
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
            Global.socket.disconnect()
        })

        // Lets all the other players know that a player left the lobby
        Global.socket.on('playerLeftLobby', (id) => {
            console.log("Player left game. Removing the id " + id)
            let tempPlayers = []
            for (let i = 0; i < this.state.playersInLobby.length; ++i) {
                if (this.state.playersInLobby[i].socketId !== id) {
                    tempPlayers.push(this.state.playersInLobby[i])
                } 
            }
            this.setState({
                playersInLobby: tempPlayers
            })
        })

        // Host has created the game, ready to start it
        Global.socket.on('startGame', (obj) => {
            console.log("Game has been created. Updating player arrays and then starting...")
            this.setState({loading: false})
            for (let i = 0; i < obj.players.length; ++i) {
                if (obj.players[i].id === this.state.localPlayer.id) {
                    this.props.navigation.navigate("Game", {screen: 'Gameplay', params: {gameData: obj.gameData, players: obj.players, localPlayer: obj.players[i]}})
                    return
                }
            }

            if (this.state.localPlayer.isWatching) {
                let localPlayerTemp = this.state.localPlayer
                localPlayerTemp.word = "Host"
                localPlayerTemp.isGhost = true
                this.props.navigation.navigate("Game", {screen: 'Gameplay', params: {gameData: obj.gameData, players: obj.players, localPlayer: localPlayerTemp}})
                return
            }

            // return user to main screen and show them a modal
            console.log("Unable to play game because id couldnt be found")
            this.setState({
                isGoingHome: true,
                modalText: 'Unable to play game. Returning to home screen.'
            }, () => this.setModalVisible(true))
        

            
        })   

        // Initializes all of the game data
        this.setState({
            gameData: this.props.route.params.gameData,
            playersInLobby: this.props.route.params.playersInLobby,
            playersLeft: this.props.route.params.playersLeft,
            localPlayer: this.props.route.params.localPlayer,
            code: this.props.route.params.gameData.code
        }, () => this.setState({loadingContent: false}))
    }

    // Sends server signal that player has readied up. Creates whole new playersInLobby array
    readyUp = (id) => {
        let tempArray = []
        for (let i = 0; i < this.state.playersInLobby.length; ++i) {
            let p = this.state.playersInLobby[i]
            if (this.state.playersInLobby[i].id === id) {
                p.isReady = true
            }
            tempArray.push(p)
        }

        this.setState({
            playersInLobby: tempArray
        }, () => {
            const obj = {code: this.state.gameData.code, playersInLobby: tempArray}
            Global.socket.emit("updateReadyUp", obj)
        })

    }

    // Copies the game code from the screen
    copyCode = () => {
        Clipboard.setString(this.state.gameData.code)
    }

    // Sets the quitting modal variable
    setModalExitVisible = (isVis) => {
        this.setState({modalExitVisible: isVis, modalMenuVisible: false})
    }

    // Sets the host menu variable
    setModalMenuVisible = (isVis) => {
        this.setState({modalMenuVisible: isVis, modalExitVisible: false})
    }

    // Sets the simple modal variable
    setModalVisible = (isVis) => {
        this.setState({modalVisible: isVis, modalExitVisible: false})
    }

    // Returns the user to the home screen when the host quits
    closeModal = () => {
        if (this.state.isGoingHome) {
            this.props.navigation.navigate('Home')
        } else {
            this.setModalVisible(false)
        }
        
    }
    
    // Gets the index of the player based on their id
    getIndexOfPlayer = (id) => {
        for (let i = 0; i < this.state.playersInLobby.length; ++i) {
            if (id === this.state.playersInLobby[i].id) {
                return i
            }
        }
        return 0
    }

    // Triggered if the user hits the back button. Checks whether it is host and handles accordingly
    back = () => {
        Global.socket.emit('leavingGame');
        this.props.navigation.navigate('Home')
    }

    // Figures out what modal to open when user clicks on menu based on host status
    menuButton = () => {
        if (!this.state.localPlayer.isHost) {
            this.setState({modalExitVisible: true})
        } else {
            this.setState({modalMenuVisible: true})
        }
    }

    // Renders the necessary bottom button or waiting text
    renderElement = () => {
        const index = this.getIndexOfPlayer(this.state.localPlayer.id)
        if (this.state.playersInLobby[index].isHost) {
            if (this.state.playersLeft > 0) {
                return <Text style={styles.word}>Need {this.state.playersLeft} more to start!</Text>
            } else {
                return (
                    <TouchableOpacity style={styles.startButton} onPress={this.startGame}>
                        <Text style={styles.word2}>Start game</Text>
                    </TouchableOpacity>
                )
            }
        } else {
            return <Text style={styles.word}>Waiting for host...</Text>
        }
    }

    // If host trys to create a new game
    newGame = () => {
        this.setState({modalMenuVisible: false, hasBeenEdited: false})
        this.props.navigation.navigate("GameSettings", {gameState: 2, code: this.state.gameData.code, localPlayer: this.state.localPlayer})
    }

    // If host trys to edit the game
    editGame = () => {
        this.setState({modalMenuVisible: false, hasBeenEdited: false})
        if (this.state.gameData.isCreated) {
            this.props.navigation.navigate("GameSettings", {gameState: 0, gameData: this.state.gameData, localPlayer: this.state.localPlayer })
        } else {
            this.props.navigation.navigate("GameSettings", {gameState: 1, code: this.state.gameData.code, localPlayer: this.state.localPlayer})
        }
    }

    // Get all of the game data numbers added to gamedata obj if game is not created
    getGameData = () => {
        let tempData = this.state.gameData
        let numPlayers = this.state.playersInLobby.length
        let numSubs = 0
        let numTops = 0
        let numGhosts = 0
        switch (numPlayers) {
            case 4:
                numSubs = 2
                numTops = 1
                numGhosts = 1
                break
            case 5:
                numSubs = 3
                numTops = 1
                numGhosts = 1
                break
            case 6:
                numSubs = 3
                numTops = 1
                numGhosts = 2
                break
            case 7:
                numSubs = 3
                numTops = 2
                numGhosts = 2
                break
            case 8:
                numSubs = 4
                numTops = 2
                numGhosts = 2
                break
            case 9:
                numSubs = 4
                numTops = 2
                numGhosts = 3
                break
            case 10:
                numSubs = 5
                numTops = 2
                numGhosts = 3
                break
            case 11:
                numSubs = 6
                numTops = 2
                numGhosts = 3
                break
            case 12:
                numSubs = 6
                numTops = 3
                numGhosts = 3
                break
        }
        tempData.numGhosts = numGhosts
        tempData.numPlayers = numPlayers
        tempData.numSubs = numSubs
        tempData.numTops = numTops
        this.setState({gameData: tempData})
    }

    // Start the game and notifiy the server
    startGame = () => {
        if (this.state.startingGame) {
            return
        }
        this.setState({loading: true, startingGame: true}, () => {
            let tempPlayers = this.state.playersInLobby.slice()
            if (this.state.gameData.isCreated) {
                tempPlayers.splice(0, 1)
            }
    
            if (!this.state.gameData.isCreated) {
                this.getGameData()
            } 
            console.log(this.state.gameData)
            let obj = {
                code: this.state.code,
                gameData: this.state.gameData,
                players: tempPlayers
            }
            Global.socket.emit('startGame', obj)
        })
        

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
                        <TouchableOpacity style={{zIndex: 10}} onPress={this.menuButton} >
                            <Feather name="menu" style={styles.menu} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{zIndex: 10}} onPress={() => this.props.navigation.navigate('HowTo')} >
                            <Feather name="info" style={styles.rules} />
                        </TouchableOpacity>
                        <View style={styles.headerContainer}>
                            <Text style={styles.header}>Game Lobby</Text>
                        </View>
                        <FlatList
                            data={this.state.playersInLobby}
                            renderItem={({ item }) => (
                                <PlayerListComponent player={item} localPlayerId={this.state.localPlayer.id} readyUp={this.readyUp} />
                            )}
                            keyExtractor={item => item.id.toString()}
                            style={styles.list} />
                        <TouchableOpacity onPress={this.copyCode} style={styles.codeContainer}>
                            <Feather name="copy" style={styles.icon} />
                            <Text style={styles.code}>{this.state.code}</Text>
                        </TouchableOpacity>
                        <View style={styles.header2}>
                        {
                            this.renderElement()
                        }
                        </View>
                        <QuitModalComponent modalExitVisible={this.state.modalExitVisible} setModalExitVisible={this.setModalExitVisible} 
                                            text="Are you sure you want to leave? You will be removed from the lobby." func={this.back} buttonText={"Quit"} />
                        <SimpleModalComponent modalVisible={this.state.modalVisible} setModalVisible={this.closeModal} 
                                              text={this.state.modalText} buttonText={"OK"} />
                        <HostMenuModalComponent modalVisible={this.state.modalMenuVisible} setModalVisible={this.setModalMenuVisible} 
                                                editGame={this.editGame} newGame={this.newGame} quit={this.setModalExitVisible} />
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
    headerContainer: {
        borderBottomWidth: 2,
        borderColor: 'rgba(144, 156, 216, .2)',
    },
    header: {
        width: Dimensions.get('window').width,
        padding: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        letterSpacing: Dimensions.get('window').width * .01,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').width * .08,
        fontFamily: 'PatrickHand',

    },
    header2: {
        width: Dimensions.get('window').width,
        padding: Dimensions.get('window').height * .02,
    },
    word: {
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },
    word2: {
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        fontSize: Dimensions.get('window').height * .03,
        fontFamily: 'PatrickHand',
        textAlign: 'center',
    },
    container: {
        marginTop: Dimensions.get('window').height * .04,
        marginBottom: Dimensions.get('window').height * .3,
    },

    list: {
        height: Dimensions.get('window').height * .65,
        borderBottomWidth: 3,
        borderColor: 'rgba(144, 156, 216, .2)',
    },
    codeContainer: {
        flexDirection: 'row',
        width: Dimensions.get('window').width * .4,
        marginLeft: Dimensions.get('window').width * .3,
        marginRight: Dimensions.get('window').width * .3,
        justifyContent: 'center',
        marginTop: Dimensions.get('window').height * .01,
    },
    code: {
        color: Color.TEXT,
        fontSize: Dimensions.get('window').height * .04,
        fontFamily: 'PatrickHand',
    },
    icon: {
        textAlign: 'right',
        marginRight: Dimensions.get('window').width * .05,
        fontSize: Dimensions.get('window').height * .025,
        color: Color.TEXT,
        marginTop: Dimensions.get('window').height * .015,
    },
    menu: {
        fontSize: Dimensions.get('window').height * .03,
        color: Color.TEXT,
        position: 'absolute',
        top: 5,
        left: Dimensions.get('window').width * .04,
    },
    rules: {
        fontSize: Dimensions.get('window').height * .03,
        color: Color.TEXT,
        position: 'absolute',
        top: 5,
        right: Dimensions.get('window').width * .04,
    },
})

export default LobbyScreen