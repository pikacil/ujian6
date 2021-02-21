import React from 'react';
import { View , Text } from 'react-native';

class Props extends React.Component{
    render(){
        return(
            <View>
            <Text>asdsad{this.props.text}</Text>
            </View>
        )
    }
}
export default Props;