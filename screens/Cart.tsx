import React, {useEffect, useState} from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  clearAll,
  getItem,
  multiSet,
  removeItem,
  setItem,
} from '../services/AsyncAPI';
import {getProductList} from '../services/productAPI';
import colors from '../styles/colors';

const Cart = ({navigation, route}: any) => {
  //   console.log('route', route.params.totalPrice);
  const [products, setProducts]: any = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  let temmPrice = 0;
  const Item = ({product, index}: any) => {
    const [count, setCount] = useState(product.quantity);
    const [price, setPrice] = useState(product.price);
    // console.log('productITEM', product);

    //   image = profile.picture;
    return (
      <View
        key={index}
        style={{
          // marginVertical: '1%',
          marginHorizontal: '3%',
          backgroundColor: 'white',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          height: 150,
          // borderBottomColor: '#4a4a4a',
          // borderBottomWidth: 0.7,
          marginBottom: 8,
          elevation: 5,
        }}>
        <View
          style={{
            flex: 1.5,
            //   backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginRight: 10,
          }}>
          <Image
            resizeMode="contain"
            style={{height: '90%', width: '100%'}}
            source={{uri: product.image}}
          />
        </View>
        <View
          style={{
            flex: 2.6,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            //   backgroundColor: 'red',
          }}>
          <View style={{height: 40, marginTop: 20}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              {product.title}
            </Text>
          </View>
          <View>
            <Text style={{color: 'black'}}>{product.category}</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              <Text style={{}}>Rating </Text>
              {product.rating.rate}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // flex: 1,
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
                if (product.quantity > 1) {
                  let arr = products;
                  product.quantity = product.quantity - 1;
                  product.newPrice = product.newPrice - product.price;
                  arr[index] = product;
                  setProducts([...arr]);
                  setCartTotal(cartTotal - product.price);
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
              {product.quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                // setCount(count + 1);
                // setPrice(price + products.price);
                let arr = products;
                product.quantity = product.quantity + 1;
                // console.log('quantity', product.quantity);
                // console.log('product', products);

                product.newPrice = product.newPrice + product.price;
                setCartTotal(cartTotal + product.price);
                console.log('cartTotal', cartTotal);

                console.log(' Price + product.price', product.newPrice);
                arr[index] = product;
                setProducts([...arr]);
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
        </View>
        <View
          style={{
            flex: 1,
            //   backgroundColor: 'blue',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            //   marginTop: 20,
          }}>
          <TouchableOpacity
            onPress={async () => {
              setCartTotal(cartTotal - product.newPrice);
              products.splice(index, 1);
              await setItem('cartList', JSON.stringify(products));
              setProducts([...products]);

              // setProducts(products);
              console.log('products indexy', index);
            }}>
            <Image
              style={{height: 40, width: 40, marginTop: 20}}
              source={require('../assets/cart/delete.png')}></Image>
          </TouchableOpacity>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 20,
              width: 50,
              height: 40,
              overflow: 'hidden',
            }}>
            <Text style={{fontSize: 15, color: 'black', textAlign: 'center'}}>
              Price
            </Text>
            <Text style={{fontSize: 15, color: 'black', textAlign: 'center'}}>
              <Text>$</Text>
              {product.newPrice}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const addNewKeyValue = async () => {
    let arr = route.params.item || [];

    await getItem('cartList').then((res: any) => {
      let data = JSON.parse(res);
      console.log('data getItem', data);

      if (data.length > 0) {
        setProducts(data);
      } else {
        console.log('No product found');
      }
    });
  };

  useEffect(() => {
    //   getProductList(setProducts, () => {});
    // console.log('route', route.params.item);

    addNewKeyValue();

    // setCartTotal(route.params.totalPrice);
    // setProducts(products);
  }, []);

  const totalPrice = () => {
    let total = 0;
    products.map((item: any) => {
      total = total + item.newPrice;
      console.log('total', total);
    });

    setCartTotal(total);
  };

  useEffect(() => {
    const stringProducts: string = JSON.stringify(products);
    setItem('cartList', stringProducts);
    totalPrice();
  }, [products]);

  const renderItem = ({item, index}: any) => {
    return <Item product={item} productsArray={products} index={index} />;
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={[
          colors.skyBlue,
          {
            marginBottom: 15,
            flexDirection: 'row',
            height: 60,
            justifyContent: 'center',
            // alignItems: 'center',
            alignContent: 'center',
            // marginBottom: 15,
            // paddingTop: 25,
          },
        ]}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{height: 30, width: 30, marginLeft: 20}}
            source={require('../assets/cart/back.png')}></Image>
        </TouchableOpacity>

        <View style={{flex: 8, justifyContent: 'center'}}>
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
            Cart
          </Text>
        </View>
      </View>

      {/* List Of cart Items */}
      <View style={{flex: 1}}>
        <FlatList
          data={products}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            return (
              <View style={{flex: 1, marginTop: '50%'}}>
                <Image
                  style={{alignSelf: 'center'}}
                  source={require('../assets/cart/emptyCart.png')}></Image>
              </View>
            );
          }}
        />
        <View
          style={{
            height: 60,
            width: '100%',
            backgroundColor: '#2badf9',
            alignSelf: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 2, marginLeft: 20, flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                // backgroundColor: 'red',
              }}>
              Total Price: $
              <Text>
                {products
                  .reduce((total: any, item: any) => {
                    let total1 = total + Number(item.newPrice);
                    return total1;
                  }, 0)
                  .toFixed(2)}
              </Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              //   let empty: string = [];
              if (products.length > 0) {
                ToastAndroid.show('Happy Shopping', ToastAndroid.SHORT);
              }
              removeItem('cartList');
              setProducts([]);
            }}>
            <Text
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                width: 80,
                height: 30,
                textAlign: 'center',
                textAlignVertical: 'center',
              }}>
              Check Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Cart;
