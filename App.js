import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from './src/screens/LoginScreen'
import ChatRoomScreen from './src/screens/ChatRoomScreen'
import RegisterScreen from './src/screens/RegisterScreen'
import ProfileScreen from "./src/screens/ProfileScreen";
import CameraScreen from './src/screens/CameraScreen'
import AddFriendScreen from "./src/screens/AddFriendScreen";
import ChatScreen from "./src/screens/ChatScreen";

const MainNavigator = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  ChatRoom: { screen: ChatRoomScreen },
  Register: { screen: RegisterScreen },
  Profile: { screen: ProfileScreen },
  Camera: { screen: CameraScreen},
  AddFriend: { screen: AddFriendScreen},
  Chat: { screen: ChatScreen},

});

const App = createAppContainer(MainNavigator);

export default App;