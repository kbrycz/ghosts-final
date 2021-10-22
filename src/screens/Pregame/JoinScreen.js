import React from 'react'
import {View, StyleSheet, Dimensions, Image, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import * as Color from '../../../global/Color'
import ConfirmationComponent from '../../components/Create/ConfirmationComponent'
import BackgroundImage from '../../components/General/BackgroundImage'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import CodeComponent from '../../components/Join/CodeComponent'
import * as Global from '../../../global/Global'
import { Ionicons } from '@expo/vector-icons'; 
import SimpleModalComponent from '../../components/Modal/SimpleModalComponent'
import uuid from 'react-native-uuid'
import HideKeyboard from '../../components/General/HideKeyboard'

class JoinScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            status: 0,
            currentPlayerName: '',
            codeToJoin: '',
            modalVisible: false,
            localPlayer: {},
            isJoining: false
        }
    }

    componentDidMount() {
        // If the room exists, send user to the name screen
        Global.socket.on('roomExists', code => {
            console.log("The room exists: " + code)
            this.setState({
                status: 1,
                codeToJoin: code,
                loading: false
            })
        }) 

        // If room does not exist, send user a modal telling them the problem
        Global.socket.on('roomDoesNotExist', code => {
            console.log("The room does not exist: " + code)
            this.setState({
                text: "This game does not exist. Please try another one!",
                modalVisible: true,
                loading: false
            })
        }) 

        // If the room exists, send user to the name screen
        Global.socket.on('roomFull', () => {
            console.log("The room is full")
            this.setState({
                text: "This game is full. Please try another one!",
                modalVisible: true,
                loading: false
            })
        }) 

        // Host has added user to game and now is giving user all of the data
        Global.socket.on('updatePlayersArray', (obj) => {
            console.log("updating this players arrays to the hosts one")
            this.setState({loading: false})
            this.props.navigation.navigate('Lobby', {screen: 'LobbyScreen', params: {gameData: obj.gameData, playersLeft: obj.playersLeft,
                                                    playersInLobby: obj.playersInLobby, localPlayer: this.state.localPlayer, isEdited: false}})
        })

    }

    // Sends the user back a page
    backButton = () => {
        if (this.state.status === 0) {
            this.props.navigation.navigate("Home", {screen: 'Main'})
        } else {
            this.setState({status: 0})
        }
    }

    // Update the current players name
    updateCurrentPlayerName = (n) => {
        this.setState({currentPlayerName: n})
    }

    // Sets the value of the simple modal
    setModalVisible = (isVis) => {
        this.setState({modalVisible: isVis})
    }

    // Calls server for user to join the game
    joinGame = () => {
        if (this.state.isJoining) {
            return
        }
        this.setState({loading: true})
        console.log("user attempting to join game")
        let player = {
            id: uuid.v4(),
            socketId: Global.socket.id,
            name: this.state.currentPlayerName,
            isReady: false,
            isHost: false,
            isWatching: false,
            canPlay: true,
            isGhost: false,
            word: '',
            isTopic: false,
            votes: 0,
            isDead: false,
        }
        this.setState({
            localPlayer: player
        }, () => {
            let obj = {
                player: this.state.localPlayer,
                roomName: this.state.codeToJoin
            }

            this.setState({
                isJoining: true
            }, () => Global.socket.emit('addPlayerToLobby', obj))
        })
    }

    // Calls server to check whether the room name is available
    checkRoomName = (code) => {
        this.setState({loading: true})
        if (code.length < 5) {
            this.setState({
                text: 'Invalid code. Must be at least 5 characters.',
                modalVisible: true,
                loading: false
            })
            return
        }
        Global.socket.emit('isRoomAvailable', code)
    }

    // Renders which screen should show up
    renderScreens = () => {
        switch (this.state.status) {
            case 0:
                return <CodeComponent checkRoomName={this.checkRoomName} />
            case 1:
                return <ConfirmationComponent text={"You have successfully joined " + this.state.codeToJoin + ". Enter your name to go to the lobby!"} 
                                              gameFunction={this.joinGame} currentPlayerName={this.state.currentPlayerName} updateCurrentPlayerName={this.updateCurrentPlayerName} />
        }
    }

    render() {
        return (
            <>
            <BackgroundImage />
            <View style={styles.container}>
                <LoadingIndicator loading={this.state.loading} />
                <HideKeyboard>
                    <SafeAreaView style={styles.safeView}>
                        <TouchableOpacity onPress={this.backButton} >
                            <Ionicons name="arrow-back-sharp" style={styles.back} />
                        </TouchableOpacity>
                        {this.renderScreens()}
                        <SimpleModalComponent modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} text={this.state.text} buttonText={"OK"} />
                    </SafeAreaView>
                </HideKeyboard>
                
            </View>
            </>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    },
    safeView: {
        height: Dimensions.get('window').height
    },
    back: {
        fontSize: Dimensions.get('window').height * .04,
        color: Color.TEXT,
        position: 'absolute',
        top: 0,
        left: Dimensions.get('window').width * .03,
    },
})

export default JoinScreen