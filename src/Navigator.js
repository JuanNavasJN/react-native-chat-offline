import {createAppContainer} from 'react-navigation';
import {createStackNavigator, TransitionPresets} from 'react-navigation-stack';

import ChatScreen from './screens/ChatScreen';
import ChatsScreen from './screens/ChatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const RootStack = createStackNavigator(
  {
    Chat: {
      screen: ChatScreen,
    },
    Chats: {
      screen: ChatsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
    SignIn: {
      screen: SignInScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    // initialRouteName: 'Profile',
    initialRouteName: 'SignIn',
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
);

const Navigator = createAppContainer(RootStack);

export default Navigator;
