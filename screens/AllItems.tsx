import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {getProductList, loginStatus} from '../services/productAPI';
import colors from '../styles/colors';
import ProductDetail from './ProductDetail';
// DrawerNavigator
import {DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import {getItem, setItem} from '../services/AsyncAPI';
import {
  useIsFocused,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

const AllItems = ({navigation, route}: any) => {
  // console.log('Default theme', DefaultTheme);
  // console.log(' dark theme', DarkTheme);
  DarkTheme.colors.primary = 'black';
  DarkTheme.colors.card = 'black';
  DarkTheme.colors.background = 'black';
  DarkTheme.colors.text = 'white';

  DarkTheme.dark = true;
  const [products, setProducts] = useState([]);
  const [loader, setLoader]: any = useState();
  const [refresh, setRefresh] = useState(false);
  const [cartList, setCartList]: any = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [price, setPrice]: any = useState(0);
  const [netConnectionType, setNetConnectionType] = useState('');
  const [netStatus, setNetStatus] = useState('');
  // let price = 0
  useEffect(() => {
    getProductList(setProducts, setLoader);
  }, []);

  const isFocused = useIsFocused();

  const getCartList = async () => {
    let cartItems = await getItem('cartList');
    if (cartItems) {
      let items = JSON.parse(cartItems);
      setCartList(items);

      setCartCount(items.length);
    } else {
      setCartList([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    getProductList(setProducts, setLoader);
  }, []);

  useEffect(() => {
    if (isFocused) {
      // console.log('isFoused', isFocused, cartList.length);

      getCartList();
      getItem('price').then(res => {
        if (res) {
          let data = res;
          setPrice(JSON.parse(data));
        }
      });
    }
  }, [isFocused]);

  NetInfo.fetch().then(state => {
    setNetConnectionType(state.type);
    if (state.isConnected) {
      setNetStatus('Online');
    } else {
      setNetStatus('Offline');
    }
    // console.log('Connection type', state.type);
    // console.log('Is connected?', state.isConnected);
  });
  const {colors, dark} = useTheme();
  const renderItem = ({item, index}: any) => {
    // setItem(item);
    return (
      <View
        style={{
          width: '48%',
          height: 250,
          backgroundColor: colors.card,
          marginRight: 10,
          borderRadius: 10,
          overflow: 'hidden',
          elevation: 5,
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProductDetails', {
              title: 'Product Detail',
              id: item.id,
            });
          }}
          style={{height: '60%', width: '100%'}}>
          <View>
            <Image
              resizeMode="contain"
              style={{height: '100%', width: '100%'}}
              source={{uri: item.image}}></Image>
          </View>
        </TouchableOpacity>

        <View style={{height: '10%', marginVertical: 5}}>
          <Text
            style={{
              textAlign: 'center',
              overflow: 'hidden',
              lineHeight: 25,
              fontSize: 15,
              marginHorizontal: 10,
              color: colors.text,
            }}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            height: 40,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontWeight: 'bold',
                height: 20,
                color: colors.text,
              }}>
              $
              <Text
                style={{fontSize: 15, fontWeight: 'bold', color: colors.text}}>
                {item.price}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              let flag = false;
              // console.log(cartList);
              if (cartList.length == 0) {
                setPrice(price + item.price);
                // console.log('price + item.price', price, item.price);
                // setCartCount(cartCount + 1);
                // setCartCount(cartList.length);
                item.quantity = 1;
                item.newPrice = item.price;
                cartList.push(item);
                setCartCount(1 + cartCount);
                setItem('cartList', JSON.stringify(cartList));
                setItem('price', JSON.stringify(price));
                ToastAndroid.showWithGravityAndOffset(
                  'Item added to cart',
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                  25,
                  50,
                );
              } else {
                cartList.map((cartProduct: any) => {
                  if (cartProduct.id == item.id) {
                    flag = true;
                  }
                  // console.log('map check');
                });
                if (flag) {
                  ToastAndroid.showWithGravityAndOffset(
                    'Item already added to cart',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                  );
                } else {
                  setPrice(price + item.price);
                  // console.log('price + item.price', price, item.price);
                  setCartCount(1 + cartCount);

                  item.quantity = 1;
                  item.newPrice = item.price;
                  cartList.push(item);
                  setItem('cartList', JSON.stringify(cartList));
                  setItem('price', JSON.stringify(price));
                  ToastAndroid.showWithGravityAndOffset(
                    'Item added to cart',
                    ToastAndroid.SHORT,
                    ToastAndroid.TOP,
                    25,
                    50,
                  );
                  // console.log('cartList', cartList, 'cartList');
                }
              }
            }}
            style={{
              backgroundColor: colors.primary,
              flex: 1.6,
              justifyContent: 'center',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginRight: 10,
                borderTopLeftRadius: 15,
                color: 'white',
                textAlign: 'right',
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  // globalThis.myvar = 0;
  // BackHandler.addEventListener('hardwareBackPress', () => {
  //   Alert.alert('Exit App', 'Do you want to exit?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {text: 'YES', onPress: () => BackHandler.exitApp()},
  //   ]);
  //   return true;
  // });

  return (
    <View style={{flex: 1}}>
      {/* Header  */}
      <View
        style={{
          backgroundColor: colors.primary,
          flexDirection: 'row',
          height: 80,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 0,
          paddingTop: 0,
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            loginStatus('false');
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
          }}
          style={{
            height: 40,
            width: 80,
            position: 'absolute',
            top: 10,
            left: 20,
            flexDirection: 'row',
          }}>
          <Image
            style={{height: 25, width: 25, marginRight: 10}}
            source={require('../assets/allitems/logout.png')}></Image>
          <Text style={{fontSize: 18, color: 'white', marginTop: -1}}>
            logOut
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{flex: 1, marginLeft: 20}}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/allitems/menu.png')}></Image>
        </TouchableOpacity>

        <View style={{flex: 8}}>
          <Text
            style={[
              {
                textAlign: 'center',
                fontSize: 28,
                marginRight: 30,
                fontWeight: 'bold',
                color: 'white',
              },
            ]}>
            All Items
          </Text>
        </View>
        {/* Cart Icon  */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart', {
              title: 'Cart',
            });
          }}
          style={{flex: 2}}>
          <Text
            style={{
              position: 'absolute',
              top: '10%',
              left: '20%',
              // backgroundColor: 'white',
              borderRadius: 50,
              // height: 10,
              // width: 10,
              textAlign: 'center',
              textAlignVertical: 'top',
              fontSize: 10,
              color: 'white',
            }}>
            {cartCount}
          </Text>
          <Image
            style={{height: 30, width: 30, marginRight: 20}}
            source={require('../assets/cart/cart.png')}></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          // backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Text style={{color: colors.text}}>
          Connection: {netConnectionType}
        </Text>
        <Text style={{color: colors.text}}>Status: {netStatus}</Text>
      </View>
      {/* Flat list of Products */}
      {!loader && products.length > 0 && (
        <FlatList
          style={{flex: 1, paddingHorizontal: '5%'}}
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={renderItem}
          numColumns={2}
          onRefresh={() => {
            // setLoader(true);
            getProductList(setProducts, setRefresh);
            // console.log('refresh', refresh);
          }}
          refreshing={refresh}
        />
      )}
      {loader && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default AllItems;
