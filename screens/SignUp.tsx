import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TextInput,
  Touchable,
  TouchableOpacity,
  Animated,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import DarkMode from '../components/DarkMode';
import {getItem, multiSet, setItem} from '../services/AsyncAPI';

const SignUp = ({navigation, route}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Image
        style={{position: 'absolute', bottom: 0, right: -52}}
        source={require('../assets/Login/background.jpg')}></Image> */}
      {/* <KeyboardAvoidingView> */}
      <View style={{flex: 1, marginHorizontal: 30}}>
        <View
          style={{
            height: 60,
            //   backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
            marginVertical: 0,
            marginTop: 25,
          }}>
          <View style={{flex: 1}}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../assets/Login/store.png')}></Image>
          </View>
          <Text style={{color: 'blue', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Product</Text>
            Store
          </Text>
        </View>

        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginVertical: 10,
            color: 'black',
          }}>
          Sign Up
        </Text>
        <Text
          style={{
            fontSize: 17,
            marginVertical: 10,
            color: 'black',
          }}>
          Please Log in to View your Portfolios, Whatchlist stock quotes and
          market list
        </Text>
        {/* input 1 */}
        <View
          style={{
            display: 'flex',
            height: 100,
            //   backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 5,
              color: 'black',
            }}>
            Name
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,
              paddingLeft: 15,
            }}
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter your name"></TextInput>
        </View>
        {/* input 2 */}
        <View
          style={{
            display: 'flex',
            height: 100,
            //   backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 5,
              color: 'black',
            }}>
            User Name
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,
              paddingLeft: 15,
            }}
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder="Ex. Madi188"></TextInput>
        </View>
        {/* input 3 */}
        <View
          style={{
            display: 'flex',
            height: 100,
            //   backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginVertical: 5,
              color: 'black',
            }}>
            Password
          </Text>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,

              paddingLeft: 15,
            }}
            placeholder="********"></TextInput>
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: 'blue',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            elevation: 5,
          }}
          onPress={() => {
            if (username.length > 0 && password.length > 0 && name.length > 0) {
              let keyValue = [
                ['username', username],
                ['password', password],
              ];
              setItem('name', name);
              multiSet(keyValue);
              Alert.alert('Success', 'Account Created Successfully');
              setUsername('');
              setPassword('');
            } else {
              Alert.alert('Username and Password cannot be empty');
            }
            // navigation.navigate('Main');
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            SignUp
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color: 'blue'}}>Already Have an account?</Text>
        </TouchableOpacity>
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default SignUp;
