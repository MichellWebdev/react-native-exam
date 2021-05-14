// Need to improve:
// (1) stackHeaderOptions() causing error (but still works)
// (2) minor red lines (Stack options, route.params.title)
// (3) naming convention - ProfileScreen (the only one with 'Screen' in name)
// (4) chatroom name (shown on top bar i.e. CBS Surf) - as participant user name instead?
// (5) create chatroom icon size warning

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

// Reducers
import UserReducer from './redux-store/reducers/UserReducer';
import ChatReducer from './redux-store/reducers/ChatReducer';

// Screens components
import Home from './screens/HomeScreen';
import Chat from './screens/chat/ChatScreen';
import ChatMessages from './screens/chat/ChatMessages';
import CreateChatRoom from './screens/chat/CraeteChatRoom';
import Signup from './screens/SignupScreen';
import Login from './screens/LoginScreen';
import CompleteSignup from './screens/CompleteSignup';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './components/profile/EditProfile';
import Discover from './screens/discover/DiscoverScreen';
import Events from './screens/discover/EventsScreen';
import EventsDetail from './screens/discover/EventsDetailScreen';
import StudentOrg from './screens/discover/StudentOrgScreen';
import StudentOrgDetail from './screens/discover/StudentOrgDetailScreen';
import Posts from './screens/discover/PostsScreen';
import Input from './components/common/Input';

// Redux store
const rootReducer = combineReducers({
  user: UserReducer,
  chat: ChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Redux thunk
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// Navigation
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackHeaderOptions = (title: string) => {
  return {
    headerTitle: title,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: '#5050A5',
      textTransform: 'uppercase',
      fontSize: 20,
      fontWeight: 'bold',
    },
  };
};

function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitle: 'PROFILE',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 24,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{
          headerTitle: 'Edit profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 24,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        }}
      />
    </Stack.Navigator>
  );
}

function ChatStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Chat'
        component={Chat}
        options={({ navigation }) => ({
          headerTitle: 'CHAT',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 24,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
          headerRight: () => (
            <Ionicons
              style={styles.icon}
              name='create-outline'
              size={25}
              onPress={() => navigation.navigate('CreateChatRoom')}
            />
          ),
        })}
      />
      <Stack.Screen
        name='ChatMessages'
        component={ChatMessages}
        options={({ route }) => ({
          headerTitle: route.params.chatroomName,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        })}
      />
      <Stack.Screen
        name='CreateChatRoom'
        component={CreateChatRoom}
        options={({ route }) => ({
          headerTitle: 'Create Chatroom',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        })}
      />
    </Stack.Navigator>
  );
}

function DiscoverStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Discover' component={Discover} options={stackHeaderOptions('DISCOVER')} />
      <Stack.Screen
        name='DiscoverEvents'
        component={DiscoverEventsStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DiscoverStudentOrg'
        component={DiscoverStudentOrgStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='DiscoverPosts'
        component={Posts}
        options={{
          headerTitle: 'POSTS',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        }}
      />
    </Stack.Navigator>
  );
}

function DiscoverEventsStackNavigator() {
  // const { title } = props.route.params;

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Events'
        component={Events}
        options={{
          headerTitle: 'EVENTS',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        }}
      />
      <Stack.Screen
        name='EventsDetail'
        component={EventsDetail}
        // https://reactnavigation.org/docs/headers/
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        })}
      />
    </Stack.Navigator>
  );
}

function DiscoverStudentOrgStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='StudentOrg'
        component={StudentOrg}
        options={{
          headerTitle: 'STUDENT ORGANIZATIONS',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        }}
      />
      <Stack.Screen
        name='StudentOrgsDetail'
        component={StudentOrgDetail}
        // https://reactnavigation.org/docs/headers/
        options={({ route }) => ({
          headerTitle: route.params.title,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#5050A5',
            textTransform: 'uppercase',
            fontSize: 20,
            fontWeight: 'bold',
          },
          headerBackTitle: ' ',
        })}
      />
    </Stack.Navigator>
  );
}

const MainNavigationAccess = () => {
  // loggedInUser is giving an error but it still works
  const isSignedIn = useSelector((state: RootState) => state.user.loggedInUser);

  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Discover') {
                iconName = 'search-outline';
              } else if (route.name === 'Chat') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#5050A5',
            inactiveTintColor: '#B7B7B7',
          }}>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Discover' component={DiscoverStackNavigator} />
          <Tab.Screen name='Chat' component={ChatStackNavigator} />
          <Tab.Screen name='Profile' component={ProfileStackNavigator} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='Signup'
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='CompleteSignup'
            component={CompleteSignup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Login'
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigationAccess />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingRight: 30,
    color: '#5050A5',
  },
});
