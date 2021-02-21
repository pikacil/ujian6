import React, { Component, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    PermissionsAndroid,
    Platform,
    ToastAndroid,
    Button
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { RNCamera } from 'react-native-camera';
// import {
//     launchCamera,
//     launchImageLibrary
//   } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker'
// import ImgToBase64 from 'react-native-image-base64';
import styles from './style'

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
// import Icon from 'react-native-vector-icons/Feather';
import database from '@react-native-firebase/database';

import Geolocation from '@react-native-community/geolocation';

const FirebaseStorage = storage();




class Formadduser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nama: " ",
            gender: "-",
            umur: " ",
            status: " ",
            downloadUrl: "",
            location: "",
            uri: "gs://ujian6-babd5.appspot.com/wp3803463.jpg",
            fileImage: null
        }
    }

    componentDidMount(){
       
         if (this.hasLocationPermission) {
            Geolocation.getCurrentPosition(
                info => {
                    const { coords } = info
                    console.log( coords.latitude)
                    console.log( coords.longitude)
                    this.setState({ location: coords.latitude+', '+coords.longitude })
                    // this.setState({ location: response.uri })
                 
                },
              
                error => console.log(error),
                {
                    enableHighAccuracy: true,
                    timeout: 2000,
                    maximumAge: 3600000
                }
            )
        }
    }
  
  
    submitData = () => {
        let storageRef = this.createStorageReferences(this.state.fileImage)
        storageRef.putFile(this.state.fileImage.uri).then((res) => {


            console.log(JSON.stringify(res))

            storageRef.getDownloadURL().then(

                (download) => {


                    firestore()
                        .collection('Datauser')
                        .doc(this.state.nama)
                        .set({
                            nama: this.state.nama,
                            gender: this.state.gender,
                            umur: this.state.umur,
                            status: this.state.status,
                            location: this.state.location,
                            urlDownload: download


                        })
                        .then((res) => {
                            this.props.navigation.navigate("Formlist")
                                console.log('data added!');
                                Alert.alert("Laporan anda sedang di prosess")

                        }).catch((error) => {
                            Alert.alert("Maaf Gagal Simpan", JSON.stringify(error))

                        });



                })



        }).catch((err) => {
            console.log(err)
        })



    }
    requestPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ]);
                // If Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else { return true; }
    };




    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

            ])
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                this.captureCamera();

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };


    captureCamera = () =>
        ImagePicker.launchCamera(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 200,
                maxWidth: 200,

            },
            (response) => {
                console.log('data urinya '+response);
                this.setState({ uri: response.uri })
                this.setState({ fileImage: response })


            },
        )
    createStorageReferences = response => {
        const { fileName } = response

        return FirebaseStorage.ref(fileName)
    }
    render() {

        return (

            <View style={styles.container}>
                <KeyboardAwareScrollView
                    style={{ flex: 1, width: '100%' }}
                    keyboardShouldPersistTaps="always">
                    <View style={{paddingLeft:25}}>
                        <Text style={styles.footerText}>Nama</Text>
                    </View>
                   
                    <TextInput
                        style={styles.input}
                        placeholder='Nama'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(nama) => this.setState({ nama: nama })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                      <View style={{paddingLeft:25}}>
                        <Text style={styles.footerText}>Gender</Text>
                    </View>
                    <View style={{paddingLeft:25,paddingRight:25}}>
                    <RNPickerSelect
                        onValueChange={(gender) => this.setState({ gender: gender })}
                        items={[
                            { label: 'laki', value: 'laki' },
                            { label: 'perempuan', value: 'perempuan' },
                           
                        ]}
                        style={pickerStyle}
                         placeholder={{ label: "select Gender", value: null }}
                    />
                        </View>
                        <View style={{paddingLeft:25}}>
                        <Text style={styles.footerText}>Umur</Text>
                    </View>
                        <TextInput
                        style={styles.input}
                        placeholder='Input umur'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(umur) => this.setState({ umur: umur })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                      <View style={{paddingLeft:25}}>
                        <Text style={styles.footerText}>Status</Text>
                    </View>
                        <View style={{paddingLeft:25,paddingRight:25}}>
                        <RNPickerSelect
                      
                      items={[
                          { label: 'Married', value: 'married' },
                          { label: 'Single', value: 'single' },
                          { label: 'Divorced', value: 'divorced' },
                      ]}
                      onValueChange={(status) => this.setState({ status: status })}
                      style={pickerStyle}
                      placeholder={{ label: "select status", value: null }}
                      />
                            </View>
                     
                           
        <View style={{flex: 1, backgroundColor: 'powderblue',flexDirection:'row'}}>
        <View style={{flex: 1, backgroundColor: 'skyblue',justifyContent: 'center',alignItems: 'center'}} >
        <Image
          source={{uri: this.state.uri}}
          style = {{ width: 80, height: 80 }}
        />
        </View>
        <View style={{flex: 1, backgroundColor: 'steelblue',justifyContent: 'center',alignItems: 'center'}}>
            <Text style={{ fontSize: 20 }} onPress={() => {
                            if (this.requestPermission()) {

                                this.captureCamera();

                            }


                        }

                        }>Take photo</Text></View>
        </View>
                    
                   
                     <View style={{paddingLeft:25}}>
                         
                        <Text style={styles.footerText}>Location</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                       value={this.state.location}
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(location) => this.setState({ location: location })}

                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <View  style={{paddingLeft:100,paddingRight:100}}>
                    <Button  title="Send Data" onPress={this.submitData} ></Button>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
    hasLocationPermission = async () => {


        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };
}
const styles2 = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : "#fff",
        alignItems      : "center",
        justifyContent  : "center",
    },
    back: {
        backgroundColor:'#51dbd4',
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
      },

});
const customPickerStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderWidth: 1,
      borderColor: 'green',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: 'blue',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  const pickerStyle = {
	inputIOS: {
		color: 'white',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
	},
	inputAndroid: {
		color: 'black',
        backgroundColor:'white'
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};
export default Formadduser;

