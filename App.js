import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home/HomeScreen'
import AboutScreen from './src/screens/Home/AboutScreen'
import HowToScreen from './src/screens/Home/HowToScreen'
import StoreScreen from './src/screens/Home/StoreScreen'
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as Color from './global/Color'
import CreateScreen from './src/screens/Pregame/CreateScreen';
import JoinScreen from './src/screens/Pregame/JoinScreen';
import LobbyScreen from './src/screens/Pregame/LobbyScreen';


// Creates stack for the Home screens
const Home = createStackNavigator();
const HomeStack = () => {
  return (
    <Home.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          presentation: 'modal'
        }}>
        <Home.Screen name="Main" component={HomeScreen} />
        <Home.Screen name="About" component={AboutScreen} />
        <Home.Screen name="How" component={HowToScreen} />
        <Home.Screen name="Store" component={StoreScreen} />
    </Home.Navigator>
  )
}

// Creates stack for the Game screens
// const Game = createStackNavigator();
// const GameStack = () => {
//   return (
//     <Game.Navigator 
//         initialRouteName="Gameplay"
//         screenOptions={{
//           headerShown: false,
//         }}>
//         <Game.Screen name="Gameplay" component={GameScreen} />
//     </Game.Navigator>
//   )
// }

// Creates stack for the Game screens
const Pregame = createStackNavigator();
const PregameStack = () => {
  return (
    <Pregame.Navigator 
        initialRouteName="Create"
        screenOptions={{
          headerShown: false,
        }}>
        <Pregame.Screen name="Create" component={CreateScreen} />
        <Pregame.Screen name="Join" component={JoinScreen} />
    </Pregame.Navigator>
  )
}

// Creates stack for the Game screens
const Lobby = createStackNavigator();
const LobbyStack = () => {
  return (
    <Lobby.Navigator 
        initialRouteName="LobbyScreen"
        screenOptions={{
          headerShown: false,
          presentation: 'modal'
        }}>
        <Lobby.Screen name="LobbyScreen" component={LobbyScreen} />
        <Lobby.Screen name="HowTo" component={HowToScreen} />
    </Lobby.Navigator>
  )
}



const RootStack = createStackNavigator();

class App extends React.Component {

  // Initialize the App Screen state
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  // Loads all assets before screen renders
  // Allows for images and fonts to be in place when the screen is rendered
  async loadEverything() {

    // Loads all the images
    await Asset.loadAsync([
      require('./assets/background.png'),
      require('./assets/circle.png'),  
    ]);

    // Loads all the fonts
    await Font.loadAsync({
      NewTegomin: require('./assets/fonts/New_Tegomin/NewTegomin-Regular.ttf'),
      PatrickHand: require('./assets/fonts/PatrickHand-Regular.ttf'),
    });

    // Sets loading to false, indicating all of the loading is done and we can show the screens
    this.setState({ 
        loading: false,
    });
}
 
  // Check and see if user already has a token to log user in
  componentDidMount() {
    this.loadEverything()
  }

  // Renders the jsx for the UI
  render() {
    // TODO should be a loading screen
    if (this.state.loading) {
      return <View style={styles.background}>
                <ActivityIndicator
                    style={styles.activityIndicator}
                    animating={this.state.loading}
                    size="large"
                    color={Color.TEXT}
                />
             </View>
    } 
   else  {
      return( 
          <NavigationContainer>
             <RootStack.Navigator screenOptions={{
                headerShown: false,
                animationEnabled: false
              }}>
              <RootStack.Screen name='Home' component={HomeStack} />
              <RootStack.Screen name='Pregame' component={PregameStack} />
              <RootStack.Screen name="Lobby" component={LobbyStack} />
           </RootStack.Navigator>
          </NavigationContainer>  
      );
    }
  }
}

const styles = StyleSheet.create({
  background: {
      backgroundColor: Color.MAIN,
      height: Dimensions.get('window').height
  },
  activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
  }
})

export default function(props) {
    return <App {...props} />;
}