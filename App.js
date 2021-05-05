import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import Feed from './src/screens/Feed';
import FeedDetails from './src/screens/FeedDetails';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import About from './src/screens/About';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function FeedsStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Feed" component={Feed} />
      <HomeStack.Screen name="Details" component={FeedDetails} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
        <Tab.Screen name="Feed" component={FeedsStack} />
        {/* <Tab.Screen name="About" component={About} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
