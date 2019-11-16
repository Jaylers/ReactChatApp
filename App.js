import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LoginPage from "./src/page/login";
import ErrorPage from "./src/page/error";
// 2.2 login screen
// 2.16 chat room screen

const MainNavigator = createStackNavigator({
    LoginPage : { screen : LoginPage},
    ErrorPage : { screen : ErrorPage}
// 2.3 login screen
// 2.17 chat room screen
});

const App = createAppContainer(MainNavigator);

export default App;