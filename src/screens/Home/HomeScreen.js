import React from 'react'
import {View, StyleSheet, Dimensions, SafeAreaView, Text, TouchableOpacity, Animated} from 'react-native'
import * as Color from '../../../global/Color'
import BackgroundImage from '../../components/General/BackgroundImage'
import LoadingIndicator from '../../components/General/LoadingIndicator'
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import SimpleModalComponent from '../../components/Modal/SimpleModalComponent'
import * as Global from '../../../global/Global'
import io from "socket.io-client";

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            text: '',
            modalVisible: false,
            fadeAnim: new Animated.Value(0),
            connected: false,
        }
    }

    componentDidMount() {
        this.fadeIn()

        // If the screen gets focus, update the gamedata field
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("in here")
            this.setState({connected: false})
        });
    }

    // Fading from the splash screen
    fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: 4500
        }).start();
      };

    // Set the simple modal component variable
    setModalVisible = (isVis) => {
        this.setState({modalVisible: isVis})
    }

    // Connect to the server and be able to move onto the correct screen
    connectToServer = (screen) => {
        if (this.state.connected) {
            console.log("Already connected to server")
            return
        }
        this.setState({
            loading: true,
            connected: true
        }, () => {
            
            Global.socket = io(Global.server)
            Global.socket.connect()
            
            // If socket does not connect
            Global.socket.on('connect_error', () => {
                console.log('Connection Failed');
                this.setState({
                    loading: false,
                    connected: false,
                    text: 'Cannot connect to the server. Please try again!',
                    modalVisible: true,
                })
                Global.socket.disconnect()
            });
            // If socket is able to connect
            Global.socket.on('connect', () => {
                console.log("Successfully connected")
                this.setState({loading: false})
                this.props.navigation.navigate('Pregame', { screen: screen })
            });
        
        })
    }

    render() {
        return (
            <Animated.View style={{opacity: this.state.fadeAnim}}>
            <BackgroundImage />
            <View style={styles.container}>
                <LoadingIndicator loading={this.state.loading} />
                <SafeAreaView>
                    <Text style={styles.title}>Ghosts</Text>
                    <Text style={styles.subtitle}>Online Multiplayer Party Game </Text>
                    <View style={styles.iconView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Store')}>
                            <FontAwesome5 name="store" style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('How')}>
                            <Feather name="book-open" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                            <Feather name="info" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.playButtonView}>
                        <TouchableOpacity onPress={() => this.connectToServer("Join")}>
                            <Text style={styles.playButton}>Join game</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.connectToServer("Create")}>
                            <Text style={styles.playButton}>Create Game</Text>
                        </TouchableOpacity>
                    </View>
                    <SimpleModalComponent modalVisible={this.state.modalVisible} 
                                        setModalVisible={this.setModalVisible} 
                                        text={this.state.text} buttonText={'OK'} />
                </SafeAreaView>
                
            </View>
            </Animated.View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height
    },
    title: {
        width: Dimensions.get('window').width * .9,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        paddingTop: Dimensions.get('window').height * .15,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: {width: -2, height: 2},
        textShadowRadius: 10,
        letterSpacing: Dimensions.get('window').height * .01,
        textTransform: 'uppercase',
        fontSize: Dimensions.get('window').height * .09,
        fontFamily: 'PatrickHand'
    },
    subtitle: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginTop: Dimensions.get('window').height * .02,
        textAlign: 'center',
        color: Color.TEXT,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        letterSpacing: Dimensions.get('window').height * .004,
        fontSize: Dimensions.get('window').height * .025,
        lineHeight: Dimensions.get('window').height * .05,
        fontFamily: 'PatrickHand'
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('window').height * .22,
        width: Dimensions.get('window').width * .4,
        marginLeft: Dimensions.get('window').width * .3,
        marginRight: Dimensions.get('window').width * .3,
    },
    icon: {
        fontSize: Dimensions.get('window').height * .03,
        color: Color.TEXT,
    },
    playButtonView: {
        marginTop: Dimensions.get('window').height * .06,
    },
    playButton: {
        width: Dimensions.get('window').width * .8,
        marginLeft: Dimensions.get('window').width * .1,
        marginRight: Dimensions.get('window').width * .1,
        marginBottom: Dimensions.get('window').height * .02,
        color: Color.MAIN,
        fontSize: Dimensions.get('window').height * .03,
        letterSpacing: Dimensions.get('window').height * .005,
        textTransform: 'uppercase',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Color.TEXT,
        borderRadius: 10,
        backgroundColor: Color.TEXT,
        padding: Dimensions.get('window').height * .01,
        paddingBottom: Dimensions.get('window').height * .02,
        overflow: 'hidden',
        fontFamily: 'PatrickHand'
    },
})

export default HomeScreen