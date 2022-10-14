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
} from 'react-native';
import DarkMode from '../components/DarkMode';

const Login = ({navigation, route}: any) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* <Image
        style={{position: 'absolute', bottom: 0, right: -52}}
        source={require('../assets/Login/background.jpg')}></Image> */}
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
          Login
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
            User Name
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,
              paddingLeft: 15,
            }}
            placeholder="Ex. Madi188"></TextInput>
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
            Password
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,

              paddingLeft: 15,
            }}
            placeholder="********"></TextInput>
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
            Client ID
          </Text>
          <TextInput
            style={{
              borderRadius: 10,
              backgroundColor: '#e3e2e1',
              elevation: 5,

              paddingLeft: 15,
            }}
            placeholder="Ex. 35 32"></TextInput>
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
            navigation.navigate('Main');
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Login
          </Text>
        </TouchableOpacity>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: 'black'}}>
            Don't have an account?{' '}
            <Text style={{color: 'black', fontWeight: 'bold'}}>Sign Up</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
