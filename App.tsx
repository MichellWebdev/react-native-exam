import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens components
import Home from './screens/HomeScreen';
import Discover from './screens/DiscoverScreen';
import Chat from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfile from './components/profile/EditProfile';

function StackNavigationMenu() {
  const Stack = createStackNavigator();
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
            } else if (route.name === 'Menu') {
              iconName = 'menu-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#5050A5',
          inactiveTintColor: '#B7B7B7',
        }}>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Discover' component={Discover} />
        <Tab.Screen name='Chat' component={Chat} />
        <Tab.Screen name='Menu' component={StackNavigationMenu} />
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
