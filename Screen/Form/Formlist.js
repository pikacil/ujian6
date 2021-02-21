import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    PermissionsAndroid,
    Platform,SafeAreaView,
    ScrollView

} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default class Formlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
                datas: [],
            total:0
        }
    }

    componentDidMount() {

        firestore()
            .collection('Datauser')
            .get()
            .then(querySnapshot => {
                const users = [];
                console.log('Total data laporan: ', querySnapshot.size);
                this.setState({ location: querySnapshot.size })
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                    // console.log('Data: ', documentSnapshot.id, documentSnapshot.data());
                });
                this.setState({ datas: users })
                console.log(' data laporan: ', users);
            });

    }
    // componentDidUpdate() {

    //     firestore()
    //         .collection('Datauser')
    //         .get()
    //         .then(querySnapshot => {
    //             const users = [];
    //             console.log('Total data laporan: ', querySnapshot.size);
    //             this.setState({ location: querySnapshot.size })
    //             querySnapshot.forEach(documentSnapshot => {
    //                 users.push({
    //                     ...documentSnapshot.data(),
    //                     key: documentSnapshot.id,
    //                 });
    //                 // console.log('Data: ', documentSnapshot.id, documentSnapshot.data());
    //             });
    //             this.setState({ datas: users })
    //             console.log(' data laporan: ', users);
    //         });

    // }
    // TambahData = () => {
    //     navigation.navigate('Formadduser');
    // };
    render() {
      
        return (
    
    <View>
        <View style={{ backgroundColor: 'white', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
           <Text style={styles.label}>

           </Text>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Formadduser')} style={styles.tombol}>
                <Text style={styles.textTombol}>Tambah User</Text>
              </TouchableOpacity>
              
          </View>
          <FlatList
    data={this.state.datas}
    renderItem={({ item }) =>
    <View style={styleslist.viewList}>
    <View>
    <Image source={{ uri: item.urlDownload }} style={styleslist.Image} />
    </View>
    <View>
        <Text style={styleslist.textItemLogin} onPress={() => this.props.navigation.navigate('MyComponent')} text="1" > {item.nama}</Text>
        <Text style={styleslist.textItemUrl}> {item.gender} /{item.umur} tahun</Text>

    </View>
    <View>
        <Text style={styleslist.textItemstatus}> {item.status}</Text>

    </View>
</View>
    }
   
/>
{/* <ScrollView>
    

</ScrollView> */}
    </View>
    
        );
    }
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
        marginVertical: 5,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 20,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 15,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 15,
        marginLeft: 15,
    },
    tombol: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'pink',

    },
});
const styleslist = StyleSheet.create({
    viewList: {
        height: 100,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#DDD',
        alignItems: 'center'
    },
    Image: {
        width: 88,
        height: 80,
        borderRadius: 40
    },
    textItemLogin: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
        marginLeft: 20,
        fontSize: 16
    },
    textItemUrl: {
        fontWeight: 'bold',
        marginLeft: 20,
        fontSize: 12,
        marginTop: 10,
        color: 'blue'
    },
    textItemstatus: {
        fontWeight: 'bold',
        marginLeft: 120,
        fontSize: 12,
        marginTop: 10,
        alignItems: 'flex-end'
    }
});