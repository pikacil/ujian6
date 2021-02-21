import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';

// import { Button, StyleSheet, Text, View,  StatusBar ,  TouchableOpacity } from 'react-native';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Formadduser from './Screen/Form/Formadduser';
import Formedituser from './Screen/Form/Formedituser';
import Formlist from './Screen/Form/Formlist';
import MyComponent  from './Screen/Form/Props';
import auth from '@react-native-firebase/auth';
const Stack = createStackNavigator();


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      // user:null,
      // isLoggedIn:false
    
    }
      
      
    
    }
    // componentDidMount() {
    //   auth().onAuthStateChanged((userdata)=>{
    //       console.log("user" + JSON.stringify(userdata))
    //       if (userdata ===null){
    //       this.setState({isLoggedIn:false})
    //       }else{
    //        this.setState({user:userdata,isLoggedIn:true})
    //       }
    //   });
      // firestore()
      //   .collection('users')
      //   .get()
      //   .then(querySnapshot => {
      //     console.log('Total users: ', querySnapshot.size);
  
      //     querySnapshot.forEach(documentSnapshot => {
      //       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      //     });
      //   });
        
        
  
  
    // }
  render() {
    return (
    <NavigationContainer>
     
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Formlist" component={Formlist}  options={{ title: '' }} />
        <Stack.Screen name="Formadduser" component={Formadduser}   options={{ title: '' }} />
        <Stack.Screen name="Formedituser" component={Formedituser} iduser="2" options={{ title: '' }} />
        <Stack.Screen name="MyComponent" component={MyComponent}  textnya="21" options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export default App;