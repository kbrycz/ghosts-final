import React from 'react'
import {View, StyleSheet, Dimensions, ScrollView, Text, SafeAreaView, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import * as Color from '../../../global/Color'
import NumberPlayersComponent from '../../components/Create/NumberPlayersComponent'
import BackgroundImage from '../../components/General/BackgroundImage'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import { Ionicons } from '@expo/vector-icons'; 
import OpeningComponent from '../../components/Create/OpeningComponent'
import WordComponent from '../../components/Create/WordComponent'
import uuid from 'react-native-uuid'
import SubComponent from '../../components/Create/SubComponent'
import ConfirmationComponent from '../../components/Create/ConfirmationComponent'
import * as Global from '../../../global/Global'
import SimpleModalComponent from '../../components/Modal/SimpleModalComponent'
import PremadeSetsComponent from '../../components/Create/PremadeSetsComponent'
import SaveSettingsComponent from '../../components/Lobby/SaveSettingsComponent'


class GameSettingsScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            gameState: 0,
            hasLoaded: false,
            loading: false,
            isEditGame: false,
            status: 0,
            isCreated: false,
            numPlayers: 4,
            numGhosts: 2,
            topic: '',
            subList: [],
            currentSub: '',
            subsLeft: 0,
            numSubs: 0,
            numTops: 0,
            finalSet: {},
            code: '',
            currentPlayerName: '',
            modalVisible: false,
            premadeSets: []
        }
    }

    // Game state:
    // 0: edit created game
    // 1: edit premade game
    // 2: complete new game
    componentDidMount() {
        this.setState({
            gameState: this.props.route.params.gameState,
            hasLoaded: true
        }, () => {
            if (this.state.gameState === 0) {
                let {gameData} = this.props.route.params
                this.setState({
                    numPlayers: gameData.numPlayers,
                    numGhosts: gameData.numGhosts,
                    numSubs: gameData.numSubs,
                    numTops: gameData.numTops,
                    topic: gameData.topic,
                    finalSet: gameData.wordSet,
                    subList: gameData.wordSet.subs,
                    code: gameData.code,
                    hostSocketId: Global.socket.id,
                    isCreated: true
                })
            }
        })
        this.fetchSets()
    }

    // Fetches temp sets
    fetchSets = () =>  {
        let temp = []
        for (let i = 0; i < 15; ++i) {
            temp.push(
                {
                    id: i,
                    subs: ['Lions', 'Bears', 'Packers', 'Chiefs', 'Patriots', 'Rams', 'Chargers', 'Giants'],
                    topic: 'NFL Teams',
                    userCompleted: false
                }
            )
        }
        this.setState({
            premadeSets: temp
        })
    }

    // Gets the user ready to create the game, by setting up game details and their own localplayer data
    saveGame = () => {
        const starterData = {
            numPlayers: this.state.numPlayers,
            numGhosts: this.state.numGhosts,
            numSubs: this.state.numSubs,
            numTops: this.state.numTops,
            topic: this.state.topic,
            wordSet: this.state.finalSet,
            code: this.state.code,
            hostSocketId: Global.socket.id,
            isCreated: this.state.isCreated
        }

        this.setState({
            loading: false
        })
        this.props.navigation.navigate('Lobby', {screen: 'LobbyScreen',  params: {gameData: starterData, isEdited: true }})
    }

    // Update number of players value
    updateNumPlayers = (val) => {
        if (this.state.numPlayers + val >= 4 && this.state.numPlayers + val <= 12) {
            this.setState({
                numPlayers: this.state.numPlayers + val,
                numGhosts: Math.floor((this.state.numPlayers + val) / 2)
            })
        }
    }

    // Update number of players value
    updateNumGhosts = (val) => {
        if (this.state.numGhosts + val >= 1 && this.state.numGhosts + val <= this.state.numPlayers / 2) {
            this.setState({
                numGhosts: this.state.numGhosts + val
            })
        }
    }

    // Shows whether the user is creating their own set and sends them to next page
    isCreatingNewSet = (isCreating) => {
        if (isCreating) {
            this.setState({
                isCreated: true,
                status: 1
            })
        } else {
            this.setState({
                isCreated: false,
                status: 11
            })
        }
    }

    // Create the set and set the finalSet variable to all set variables
    createSet = () => {
        let set = {}
        set.id = uuid.v4()
        set.subs = this.state.subList
        set.topic = this.state.topic
        set.userCompleted = false
        if (this.state.gameState === 0) {
            this.setState({
                finalSet: set,
                status: 4
            })
        } else {
            this.setState({
                finalSet: set,
                status: 5
            })
        }

    }

    // Selects the set from the list and makes the set
    selectSet = (set) => {
        if (this.state.gameState === 1) {
            this.setState({
                finalSet: set,
                status: 1
            })
        } else {
            this.setState({
                finalSet: set,
                status: 12
            })
        }

    }

    // Sets the topic of the game 
    setTopic = (t) => {
        this.setState({topic: t})
    }

    // Sets the simple modal to show up
    setModalVisible = (isVis) => {
        this.setState({modalVisible: isVis})
    }

    // Sets the current sub of the game
    setCurrentSub = (sub) => {
        this.setState({currentSub: sub})
    }

    // Adds the sub to the temp sublist
    addToSubList = () => {
        this.setState({
            subList: [...this.state.subList, {id: uuid.v4(), word: this.state.currentSub}],
            currentSub: '',
            subsLeft: this.state.subsLeft - 1
        })
    }

    // Deletes subs from the temp sublist
    deleteSub = (id) =>  {
        let tempList = this.state.subList.filter(sub => {
                if (sub.id === id ) {
                    return false
                } else {
                    return true
                }
            })
        this.setState({
            subList: tempList,
            subsLeft: this.state.subsLeft + 1
        })
    }


    // Moves the status to the following page
    nextPage = () => {
        this.setState({status: this.state.status + 1})
    }

    // Prepare for the subtopic page by gatherign the correct data
    prepareForSub = () => {
        let subs = 0
        let tops = Math.ceil((this.state.numPlayers - this.state.numGhosts) / 3)
        let count = this.state.numGhosts + tops
        while (count < this.state.numPlayers) {
            subs += 1
            count += 1
        }
        if (this.state.gameState === 2) {
            this.setState({
                numSubs: subs,
                numTops: tops,
                subsLeft: subs,
            }, () => {
                this.nextPage()
            })
        } else {
            let subsLeftTemp = subs - this.state.subList.length
            if (subsLeftTemp < 0) {
                subsLeftTemp = subs
                this.setState({
                    subList: []
                })
            }
            this.setState({
                numSubs: subs,
                numTops: tops,
                subsLeft: subsLeftTemp,
            }, () => {
                this.nextPage()
            })
        }
    }

    // Sends user back to a page
    backButton = () => {
        if (this.state.status > 0) {
            if (this.state.status === 11) {
                this.setState({status: 0})
            } else {
                this.setState({status: this.state.status - 1})
            }
        }
    }



    // Figures out which order of screens to show
    organizeScreens = () => {
        if (this.state.gameState === 0) {
            return this.renderEditCreated()
        }
        else if (this.state.gameState === 1) {
            return this.renderEditPremade()
        }
        else {
            return this.renderNewGame()
        }
    }

    renderEditCreated = () => {
        switch (this.state.status) {
            case 0:
                return <NumberPlayersComponent changeVal={this.updateNumPlayers} num={this.state.numPlayers} title={'Players'} nextPage={this.nextPage} />
            case 1:
                return <NumberPlayersComponent changeVal={this.updateNumGhosts} num={this.state.numGhosts} title={'Ghosts'} nextPage={this.nextPage} />
            case 2:
                return <WordComponent topic={this.state.topic} setTopic={this.setTopic} nextPage={this.prepareForSub} />
            case 3:
                return <SubComponent createSet={this.createSet} topic={this.state.topic} currentSub={this.state.currentSub} setCurrentSub={this.setCurrentSub} 
                                addToSubList={this.addToSubList} subList={this.state.subList} subsLeft={this.state.subsLeft} deleteSub={this.deleteSub} />
            case 4:
                return <SaveSettingsComponent saveGame={this.saveGame} />
        }
    }

    renderEditPremade = () => {
        switch (this.state.status) {
            case 0:
                return <PremadeSetsComponent premadeSets={this.state.premadeSets} selectSet={this.selectSet} />
            case 1:
                return <SaveSettingsComponent saveGame={this.saveGame} />
        }
    }

    renderNewGame = () => {
        switch (this.state.status) {
            case 0:
                return <OpeningComponent isCreatingNewSet={this.isCreatingNewSet} />
            case 1:
                return <NumberPlayersComponent changeVal={this.updateNumPlayers} num={this.state.numPlayers} title={'Players'} nextPage={this.nextPage} />
            case 2:
                return <NumberPlayersComponent changeVal={this.updateNumGhosts} num={this.state.numGhosts} title={'Ghosts'} nextPage={this.nextPage} />
            case 3:
                return <WordComponent topic={this.state.topic} setTopic={this.setTopic} nextPage={this.prepareForSub} />
            case 4:
                return <SubComponent createSet={this.createSet} topic={this.state.topic} currentSub={this.state.currentSub} setCurrentSub={this.setCurrentSub} 
                                addToSubList={this.addToSubList} subList={this.state.subList} subsLeft={this.state.subsLeft} deleteSub={this.deleteSub} />
            case 5:
            case 12:
                return <SaveSettingsComponent saveGame={this.saveGame} />
            case 11:
                return <PremadeSetsComponent premadeSets={this.state.premadeSets} selectSet={this.selectSet} />
        }
    }

    render() {
        if (!this.state.hasLoaded) {
            return <LoadingIndicator loading={!this.state.hasLoaded} />
        }
        return (
            <View style={styles.container}>
                <BackgroundImage />
                <LoadingIndicator loading={this.state.loading} />
                {
                    this.state.status !== 0
                    ?   <TouchableOpacity style={{zIndex: 10}} onPress={this.backButton} >
                            <Ionicons name="arrow-back-sharp" style={styles.back} />
                        </TouchableOpacity>
                    : null
                }

                <SafeAreaView style={styles.safeView}>
                    {this.organizeScreens()}
                </SafeAreaView>
            </View>
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
        top: Dimensions.get('window').height * .01,
        left: Dimensions.get('window').width * .03,
    },
})

export default GameSettingsScreen