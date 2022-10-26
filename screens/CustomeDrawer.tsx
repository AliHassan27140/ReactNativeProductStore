import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Text,
  View,
  useColorScheme,
  StatusBar,
} from 'react-native';
import {Switch, TouchableOpacity} from 'react-native-gesture-handler';
import {getItem, setItem} from '../services/AsyncAPI';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {and} from 'react-native-reanimated';
import {DefaultTheme, DarkTheme, useTheme} from '@react-navigation/native';
import {useDrawerStatus} from '@react-navigation/drawer';
import {loginStatus} from '../services/productAPI';
import {ThemeContext} from '../App';
import {lightTheme, darkTheme} from '../styles/theme';

const Customdrawer = (navigation: any, props: any) => {
  const backgroundColor = '#03fcd7';
  const [active, setActive] = useState(backgroundColor);
  const [inactive, setInactive] = useState('white');
  const [name, setName] = useState('');
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const {theme, setTheme}: any = useContext(ThemeContext);
  const {colors, dark} = useTheme();

  const toggleSwitch = () => {
    setSwitchEnabled(previousState => !previousState);
    if (switchEnabled === false) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  // const colorScheme = useColorScheme();
  //   props.navigation.navigate('ProductNavigation');
  //   let name = '';
  useEffect(() => {
    const namefunc = async () => {
      const name1 = await getItem('name');
      setName(name1 ? name1 : '');
    };
    namefunc();
  }, []);
  // Image Picker Code
  const [filePath, setFilePath] = useState();

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response: any) => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // Alert.alert('User', 'cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.assets[0].base64);
      // console.log('uri -> ', response.assets[0].uri);
      // console.log('width -> ', response.assets[0].width);
      // console.log('height -> ', response.assets[0].height);
      // console.log('fileSize -> ', response.assets[0].fileSize);
      // console.log('type -> ', response.assets[0].type);
      // console.log('fileName -> ', response.assets[0].fileName);
      setFilePath(response.assets[0].uri);
      // console.log('filepath', response.assets[0].uri);
      const setImage1: string = filePath + '';
      setItem('image', setImage1);
      // console.log('image:setItem1 ', setImage1);
    });
  };

  //   Camera Code
  const captureImage = async (type: any) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    // let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    // if (isCameraPermitted && isStoragePermitted) {
    launchCamera(options, (response: any) => {
      // console.log('Launch Camera Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0].uri);
      const setImage1: string = filePath;
      // console.log('setFielePath:capture image', setImage1);

      setItem('image', setImage1);
      //   getimage();
    });
    // }
  };
  //   const [image, setImage] = useState('');
  let image1: any;
  const getimage = async () => {
    image1 = await getItem('image');
    // console.log('setFilePath:getImage', image1);
    // setFilePath(image1);
    return image1;
  };

  useEffect(() => {
    getimage();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Choose Image', 'Choose Image from Gallery or Camera', [
            {
              text: 'Cancel',
            },
            {
              text: 'Camera',
              onPress: () => captureImage('photo'),
            },
            {
              text: 'Gallery',
              onPress: () => chooseFile('photo'),
            },
          ]);
          //   chooseFile('photo');
          //   captureImage('photo');
        }}
        style={{
          marginTop: '10%',
          alignItems: 'center',
          height: 100,
          //   elivation: 5,
          //   backgroundColor: 'blue',
        }}>
        <ImageBackground
          style={{
            height: 100,
            width: 50,
            borderRadius: 100,
            // backgroundColor: 'red',
          }}
          resizeMode="contain"
          // source={require('../assets/customDrawer/picture.png')}
        >
          <Image
            resizeMode="cover"
            style={{
              position: 'absolute',
              left: -25,
              height: 100,
              width: 100,
              borderRadius: 50,
              //   backgroundColor: 'brown',
            }}
            //   source={require('../assets/customDrawer/user.png')}
            source={{
              uri:
                filePath == undefined
                  ? 'https://img.icons8.com/bubbles/100/000000/user.png'
                  : filePath,
            }}></Image>
        </ImageBackground>
      </TouchableOpacity>

      <View style={{}}>
        <Text style={{textAlign: 'center', fontSize: 20, color: colors.text}}>
          {name}
        </Text>
      </View>
      <View style={{flex: 0.9, marginHorizontal: 20}}>
        <View
          style={{
            // backgroundColor: 'red',
            // position: 'absolute',
            top: 10,
            height: 50,
            justifyContent: 'center',
            // alignContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, marginRight: 20, color: colors.text}}>
            Theme
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={switchEnabled ? '#f5dd4b' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={switchEnabled}
            style={{}}
          />
        </View>
        {/* Store Button */}
        <TouchableOpacity
          onPress={() => {
            // props.navigation.navigate('AllItems');
            navigation.navigation.navigate('AllItems');
          }}
          style={{
            backgroundColor: colors.primary,
            height: 50,
            marginVertical: 10,
            borderWidth: 5,
            borderColor: '#2badf9',
            borderRadius: 15,
            justifyContent: 'center',
            marginTop: 40,
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
            Store
          </Text>
        </TouchableOpacity>
        {/* DropDown Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigation.navigate('Soon');
            // navigation.toggleDrawer();
          }}
          style={{
            backgroundColor: colors.primary,
            height: 50,
            marginVertical: 10,
            borderWidth: 5,
            borderColor: '#2badf9',
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
            Drop Down
          </Text>
        </TouchableOpacity>
        {/* WobbleExample Button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigation.navigate('WobbleExample');
            // navigation.toggleDrawer();
          }}
          style={{
            backgroundColor: colors.primary,
            height: 50,
            marginVertical: 10,
            borderWidth: 5,
            borderColor: '#2badf9',
            borderRadius: 15,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
            Animation
          </Text>
        </TouchableOpacity>
      </View>
      {/* LOG OUT Button */}
      <TouchableOpacity
        onPress={() => {
          loginStatus('false');
          // navigation.reset({index: 0, routes: [{name: 'Login'}]});
          navigation.navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }}
        style={{
          height: 40,
          // width: 80,
          // position: 'absolute',
          // bottom: 100,
          // flex: 1,
          flexDirection: 'row',
          backgroundColor: '#ed1e07',
          justifyContent: 'center',
          marginHorizontal: 70,
          borderRadius: 15,
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <Image
          style={{height: 25, width: 25, marginRight: 10}}
          source={require('../assets/customDrawer/logout.png')}></Image>
        <Text style={{fontSize: 18, color: 'white', marginTop: -1}}>
          logOut
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Customdrawer;
