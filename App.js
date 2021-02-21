import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';

// import { Button, StyleSheet, Text, View,  StatusBar ,  TouchableOpacity } from 'react-native';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Formadduser from './Screen/Form/Formadduser';
import Formedituser from './Screen/Form/Formedituser';
import Formlist from './Screen/Form/Formlist';
// import auth from '@react-native-firebase/auth';
const Stack = createStackNavigator();


class App extends Component {
  render() {
    return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Formlist" component={Formlist}  options={{ title: '' }} />
        <Stack.Screen name="Formadduser" component={Formadduser}   options={{ title: '' }} />
        <Stack.Screen name="Formedituser" component={Formedituser}  options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export default App;