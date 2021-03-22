import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import Feed from './src/screens/Feed';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import About from './src/screens/About';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} animationEnabled={true} />
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

