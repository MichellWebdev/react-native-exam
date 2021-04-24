import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// // Redux
// import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { useSelector } from 'react-redux';
// import { Provider } from 'react-redux';
// import ReduxThunk from 'redux-thunk';

// // Reducers
// import UserReducer from './redux-store/reducers/UserReducer';

// Screens components
import Home from './screens/HomeScreen';
import Chat from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './components/profile/EditProfile';

import Discover from './screens/discover/DiscoverScreen';
import Events from './screens/discover/EventsScreen';
import StudentOrg from './screens/discover/EventsScreen';
import Posts from './screens/discover/PostsScreen';

// const rootReducer = combineReducers({
//   user: UserReducer,
// });

// export type RootState = ReturnType<typeof rootReducer>;

// // redux thunk
// const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const Stack = createStackNavigator();

function StackNavigationMenu() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='ProfileScreen'
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
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
          headerBackTitle: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
}

function DiscoverStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Discover" component={Discover} options={{ title: 'DISCOVER' }} />
      <Stack.Screen name="Events" component={Events} options={{ title: 'EVENTS' }} />
      <Stack.Screen name="StudentOrg" component={StudentOrg} options={{ title: 'STUDENT ORGANIZATIONS' }} />
      <Stack.Screen name="Posts" component={Posts} options={{ title: 'POSTS' }} />
    </Stack.Navigator>
  )
}

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
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
        <Tab.Screen name='Chat' component={Chat} />
        <Tab.Screen name='Profile' component={StackNavigationMenu} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
