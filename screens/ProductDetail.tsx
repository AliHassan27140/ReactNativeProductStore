import React, {useEffect, useState} from 'react';
import {Rating} from 'react-native-ratings';
import Toast from 'react-native-simple-toast';
import {
  ActivityIndicator,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import colors from '../styles/colors';
import {getProductDetails, getProductList} from '../services/productAPI';
import {getItem, setItem} from '../services/AsyncAPI';

const ProductDetail = ({navigation, route}: any) => {
  let id = route.params.id;

  const [product, setProduct]: any = useState();
  const [loader, setLoader] = useState(true);
  const [cartList, setCartList]: any = useState([]);

  useEffect(() => {
    getProductDetails(setProduct, setLoader, id);
  }, []);

  const [count, setCount] = useState(1);

  const getCartList = async () => {
    const cartList = await getItem('cartList');
    if (cartList) {
      let list = JSON.parse(cartList);

      setCartList(list);
      console.log('list', cartList);
    } else {
      console.log('no cart list');

      setCartList([]);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);
  // const [price, setPrice] = useState(product.price);
  // console.log(product);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loader && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
      {!loader && product && (
        <View>
          <View
            style={[
              colors.skyBlue,
              {
                flexDirection: 'row',
                height: 100,
                // justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
                paddingTop: 25,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
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
              <Text style={{fontSize: 18, color: 'white', marginTop: 2}}>
                Back
              </Text>
            </TouchableOpacity>

            <View style={{}}>
              <Text
                style={[
                  {
                    // textAlign: 'left',
                    marginLeft: 20,
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'white',
                  },
                ]}>
                Product Details
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              height: '70%',
              marginHorizontal: '5%',
              //   elevation: 5,
              borderRadius: 8,
              paddingHorizontal: 5,
            }}>
            <View>
              <View
                style={{
                  //   backgroundColor: 'blue',
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    width: '98%',
                    lineHeight: 30,
                    color: 'black',
                  }}>
                  {/* Quartz wrist-watch Connatation Leather LeatherLeather */}
                  {product.title}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  //   backgroundColor: 'yellow',
                }}>
                <View style={{height: 20, marginRight: 10}}>
                  <Rating
                    startingValue={product.rating.rate}
                    ratingCount={5}
                    imageSize={20}
                    readonly={true}
                  />
                </View>
                <View>
                  <Text style={{color: 'black'}}>
                    Based on {product.rating.count} Reviews
                  </Text>
                </View>
              </View>
            </View>
            {/* Loader */}
            <View
              style={{
                // backgroundColor: 'red',
                height: 40,
                position: 'absolute',
                top: '28%',
                left: '45%',
                zIndex: 1,
              }}>
              <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={loader}></ActivityIndicator>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: 200,
                width: '100%',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}
                source={{uri: product.image}}></Image>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'black',
              }}>
              $<Text style={{color: 'black'}}>{product.price}</Text>
            </Text>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
              In Stock
            </Text>
            <Text style={{height: 60, lineHeight: 19, color: 'black'}}>
              {product.description}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginVertical: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginRight: 10,
                    color: 'black',
                  }}>
                  Quantity
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (count > 1) {
                      setCount(count - 1);
                      // product.newPrice = product.price + product.newPrice;
                    }
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      width: 25,
                      textAlign: 'center',
                      borderWidth: 1,
                      color: 'black',
                    }}>
                    -
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    width: 25,
                    textAlign: 'center',
                    borderWidth: 1,
                    color: 'black',
                  }}>
                  {count}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setCount(count + 1);
                    // product.newPrice = product.newPrice + product.price;
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      width: 25,
                      textAlign: 'center',
                      borderWidth: 1,
                      color: 'black',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#2badf9'}}>
                  Add to WishList
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                let flag = false;
                cartList.map((item: any) => {
                  if (id == item.id) {
                    Toast.show('Product already added in the cart', 1000);
                    flag = true;
                  }
                });
                console.log('flag check', flag);

                if (flag == false) {
                  product.quantity = count;
                  product.newPrice = product.price * count;
                  cartList.push(product);
                  setItem('cartList', JSON.stringify(cartList));
                  Toast.show('Product Added to Cart', 1000);
                }
              }}
              style={[
                colors.skyBlue,
                {
                  borderRadius: 20,
                  height: 45,
                  justifyContent: 'center',
                  marginVertical: 15,
                },
              ]}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!loader && !product && <Text>Product Not found</Text>}
    </View>
  );
};

export default ProductDetail;
