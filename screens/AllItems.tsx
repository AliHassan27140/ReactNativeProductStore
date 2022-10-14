import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getProductList} from '../services/productAPI';
import colors from '../styles/colors';
import ProductDetail from './ProductDetail';
// DrawerNavigator
import {DrawerItemList, DrawerItem} from '@react-navigation/drawer';

const AllItems = ({navigation, route}: any) => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState();
  const [refresh, setRefresh] = useState(false);
  console.log('loader', loader);
  const id = 0;
  useEffect(() => {
    getProductList(setProducts, setLoader);
  }, []);

  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          width: '48%',
          height: 250,
          backgroundColor: 'white',
          marginRight: 10,
          borderRadius: 10,
          overflow: 'hidden',
          elevation: 1,
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
              color: 'black',
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
                color: 'black',
              }}>
              $
              <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                {item.price}
              </Text>
            </Text>
          </View>
          <View
            style={[
              colors.skyBlue,
              {
                //   backgroundColor: 'pink',
                flex: 1.6,
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
            ]}>
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
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={[
          colors.skyBlue,
          {
            flexDirection: 'row',
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            paddingTop: 25,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login', {title: 'Login'});
          }}
          style={{
            height: 40,
            width: 40,
            position: 'absolute',
            top: 10,
            left: 15,
            flexDirection: 'row',
          }}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../assets/allitems/back.png')}></Image>
          <Text style={{fontSize: 18, color: 'white', marginTop: 2}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image
            style={{height: 30, width: 30, marginLeft: 20}}
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
            getProductList(setProducts, setRefresh);
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
