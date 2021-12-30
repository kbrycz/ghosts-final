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
import HideKeyboard from '../../components/General/HideKeyboard'

class CreateScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            status: 0,
            isCreated: false,
            numPlayers: 4,
            numGhosts: 1,
            topic: '',
            subList: [],
            currentSub: '',
            subsLeft: 0,
            numSubs: 0,
            numTops: 0,
            finalSet: {},
            currentPlayerName: '',
            modalVisible: false,
            premadeSets: [],
            phantomPackPurchased: true
        }
    }

    // Gets all of the normal sets for the game
    getNormalSets = () => {
        let temp = []

        let set1 = {
            id: 0,
            title: 'Word Set 1',
            topic: 'Books',
            subs: ['The Great Gatsby', 'Tom Sawyer', 'The Hobbit', 'Harry Potter', 'Romeo and Juliet', 'The Giver', 'Jane Eyre'],
            userCompleted: false,
            diff: 0
        }
        let set2 = {
            id: 1,
            title: 'Word Set 2',
            topic: 'Candy',
            subs: ['Air Heads', 'Jolly Rancher', 'Skittles', 'Kit Kat', 'Laffy Taffy', 'Pez', 'Tootsie Roll', 'Ring Pops', 'Twizzlers'],
            userCompleted: false,
            diff: 0
        }
        let set3 = {
            id: 2,
            title: 'Word Set 3',
            topic: 'Furniture',
            subs: ['Chair', 'Couch', 'Table', 'Loveseat', 'Ottoman', 'Bed', 'Desk'],
            userCompleted: false,
            diff: 0
        }
        let set4 = {
            id: 3,
            title: 'Word Set 4',
            topic: 'NFL Teams',
            subs: ['Cardinals', 'Lions', 'Patriots', 'Chiefs', 'Dolphins', 'Vikings', 'Giants'],
            userCompleted: false,
            diff: 1
        }
        let set5 = {
            id: 4,
            title: 'Word Set 5',
            topic: 'Disney movies',
            subs: ['Lion king', 'Aladdin', 'Frozen', 'Moana', 'Hercules', 'Mulan', 'Tarzan', 'Tangled', 'Bambi', 'Pinocchio'],
            userCompleted: false,
            diff: 1
        }
        let set6 = {
            id: 5,
            title: 'Word Set 6',
            topic: 'Pizza Toppings',
            subs: ['Pepperoni', 'Mushroom', 'Sausage', 'Black olives', 'Pineapple', 'Ham',  'Bacon'],
            userCompleted: false,
            diff: 1
        }
        let set7 = {
            id: 6,
            title: 'Word Set 7',
            topic: 'Video Game Characters',
            subs: ['Mario', 'Master Chief', 'Zelda', 'Bowser', 'Sonic', 'Ash Ketchum', 'Tom Nook', 'Pac-Man', 'Lara Croft', 'Pikachu'],
            userCompleted: false,
            diff: 2
        }
        let set8 = {
            id: 7,
            title: 'Word Set 8',
            topic: 'Clothing Brands',
            subs: ['Nike', 'Louis Vuitton', 'Gucci', 'Adidas', 'Zara', 'H&M', 'Lululemon'],
            userCompleted: false,
            diff: 2
        }
        temp.push(set1)
        temp.push(set2)
        temp.push(set3)
        temp.push(set4)
        temp.push(set5)
        temp.push(set6)
        temp.push(set7)
        temp.push(set8)
        return temp
    }

    // Gets all of the normal sets for the game
    getPhantomSets = () => {
        let temp = []

        let set1 = {
            id: 10,
            title: 'Phantom Set 1',
            topic: 'Cities',
            subs: ['Detroit', 'Chicago', 'Miami', 'Charlotte', 'Dallas', 'Las Vegas', 'Boston'],
            userCompleted: false,
            diff: 0
        }
        let set2 = {
            id: 11,
            title: 'Phantom Set 2',
            topic: 'Presidents',
            subs: ['Lincoln', 'Washington', 'Skittles', 'Kit Kat', 'Laffy Taffy', 'Pez', 'Tootsie Roll', 'Ring Pops', 'Twizzlers'],
            userCompleted: false,
            diff: 0
        }
        let set3 = {
            id: 12,
            title: 'Phantom Set 3',
            topic: 'Social Media',
            subs: ['Facebook', 'Twitter', 'Snapchat', 'TikTok', 'Instagram', 'Reddit', 'LinkedIn'],
            userCompleted: false,
            diff: 0
        }
        let set4 = {
            id: 13,
            title: 'Phantom Set 4',
            topic: 'NBA Teams',
            subs: ['Lakers', 'Bulls', 'Nets', 'Pistons', 'Heat', 'Hornets', 'Rockets', 'Bucks'],
            userCompleted: false,
            diff: 1
        }
        let set5 = {
            id: 14,
            title: 'Phantom Set 5',
            topic: 'Presidents',
            subs: ['Lincoln', 'Washington', 'Biden', 'Trump', 'Obama', 'Reagan', 'Kennedy', 'Jefferson', 'Adams', 'Clinton'],
            userCompleted: false,
            diff: 1
        }
        let set6 = {
            id: 15,
            title: 'Phantom Set 6',
            topic: 'Car Brands',
            subs: ['Tesla', 'General Motors', 'Ford', 'Jeep', 'Toyota', 'Jaguar', 'Porsche'],
            userCompleted: false,
            diff: 1
        }
        let set7 = {
            id: 16,
            title: 'Phantom Set 7',
            topic: 'Billionaires',
            subs: ['Jeff Bezos', 'Elon Musk', 'Bill Gates', 'Mark Zuckerberg', 'Warren Buffett', 'Larry Page', 'Steve Ballmer', 'Michael Bloomberg', 'Daniel Gilbert', 'Jack Ma'],
            userCompleted: false,
            diff: 2
        }
        let set8 = {
            id: 17,
            title: 'Phantom Set 8',
            topic: 'Female Actors',
            subs: ['Scarlett Johansson', 'Jennifer Aniston', 'Emma Stone', 'Jennifer Lawrence', 'Reese Witherspoon', 'Margot Robbie', 'Keira Knightley'],
            userCompleted: false,
            diff: 2
        }
        temp.push(set1)
        temp.push(set2)
        temp.push(set3)
        temp.push(set4)
        temp.push(set5)
        temp.push(set6)
        temp.push(set7)
        temp.push(set8)
        return temp
    }

    // Fetches temp sets
    fetchSets = () =>  {
        let temp = []
        let normalSets = this.getNormalSets()
        for (let i = 0; i < normalSets.length; ++i) {
            temp.push(normalSets[i])
        }    

        // Get the phantom sets
        if (this.state.phantomPackPurchased) {
            console.log("here")
            let phantomSets = this.getPhantomSets()
            for (let i = 0; i < phantomSets.length; ++i) {
                temp.push(phantomSets[i])
            }    
        }
        this.setState({
            premadeSets: temp
        })

    }

    componentDidMount() {
        // Figure out if user has purchased the phantom pack here
        this.fetchSets()

        // In case user cannot connect to the server
        Global.socket.on('error', function (err) {
            this.setState({
                loading: false,
                modalVisible: true,
            })
        });

        // If room was created successfully, get ready to prepare game
        Global.socket.on('createRoom', code => {
            console.log("Room Created successfully: " + code)
            this.getReadyForGame(code)
        })
    }

    // Gets the user ready to create the game, by setting up game details and their own localplayer data
    getReadyForGame = (code) => {
        const starterData = {
            numPlayers: this.state.numPlayers,
            numGhosts: this.state.numGhosts,
            numSubs: this.state.numSubs,
            numTops: this.state.numTops,
            topic: this.state.topic,
            wordSet: this.state.finalSet,
            code: code,
            hostSocketId: Global.socket.id,
            isCreated: this.state.isCreated
        }
        // Create player array and add the host as the first player
        let playersInLobby = []
        let player = {
            id: uuid.v4(),
            socketId: Global.socket.id,
            name: this.state.currentPlayerName,
            isReady: false,
            isHost: true,
            isWatching: true,
            canPlay: false,
            isGhost: false,
            word: '',
            isTopic: false,
            votes: 0,
            isDead: false,
        }
        if (!this.state.isCreated) {
            player.canPlay = true
            player.isWatching = false
        } 
        playersInLobby.push(player)
        const playersLeft = starterData['isCreated'] ? starterData['numPlayers'] : starterData['numPlayers'] - 1
        this.setState({
            loading: false
        })
        this.props.navigation.navigate('Lobby', {screen: 'LobbyScreen',  params: {gameData: starterData, playersLeft: playersLeft, playersInLobby: playersInLobby, localPlayer: player, isEdited: false}})
    }

    // Update number of players value
    updateNumPlayers = (val) => {
        if (this.state.numPlayers + val >= 4 && this.state.numPlayers + val <= 11) {
            this.setState({
                numPlayers: this.state.numPlayers + val,
                numGhosts: Math.floor((this.state.numPlayers + val) / 2) - 1
            })
        }
    }

    // Update number of players value
    updateNumGhosts = (val) => {
        if (this.state.numGhosts + val >= 1 && this.state.numGhosts + val < Math.ceil(this.state.numPlayers / 2)) {
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
        set.title = "User Created"
        this.setState({
            finalSet: set,
            status: 5
        })
    }

    // Selects the set from the list and makes the set
    selectSet = (set) => {
        this.setState({
            finalSet: set,
            status: 12,
            topic: set.topic
        })
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
    
    // Set the current players name
    updateCurrentPlayerName = (n) => {
        this.setState({currentPlayerName: n})
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
        this.setState({
            numSubs: subs,
            numTops: tops,
            subsLeft: subs,
        }, () => {
            this.nextPage()
        })
       
    }

    // Sends user back to a page
    backButton = () => {
        if (this.state.status > 0) {
            if (this.state.status === 11) {
                this.setState({status: 0})
            } 
            else {
                this.setState({status: this.state.status - 1})
            }
        } else {
            this.props.navigation.navigate("Home", {'screen': 'Main'})
        }
    }

    // Sends the ready to create game signal to the server
    createGame = () => {
        this.setState({
            loading: true,
        }, () => {
            Global.socket.emit('createRoom')
        })
    }

    // Transfers user to the store
    goToStore = () => {
        this.props.navigation.navigate('StoreCreate')
    }

    // Renders the screens to show
    renderScreens = () => {
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
                return <ConfirmationComponent text={"You have successfully created a game. Enter your name to go to the lobby!"} 
                                              gameFunction={this.createGame} currentPlayerName={this.state.currentPlayerName} updateCurrentPlayerName={this.updateCurrentPlayerName} />
            case 11:
                return <PremadeSetsComponent premadeSets={this.state.premadeSets} selectSet={this.selectSet} goToStore={this.goToStore}/>
        }
    }

    render() {
        return (<>
            <BackgroundImage />
            <View style={styles.container}>
                <LoadingIndicator loading={this.state.loading} />
                <HideKeyboard>
                    <SafeAreaView style={styles.safeView}>
                        <TouchableOpacity onPress={this.backButton} >
                            <Ionicons name="arrow-back-sharp" style={styles.back} />
                        </TouchableOpacity>
                        {this.renderScreens()}
                        <SimpleModalComponent modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible} 
                                                text="Unable to connect to the server. Please try again!" buttonText={"OK"} />
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

export default CreateScreen