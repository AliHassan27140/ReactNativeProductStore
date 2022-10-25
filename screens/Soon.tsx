import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {clearAll} from '../services/AsyncAPI';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getProductList} from '../services/productAPI';
import axios from 'axios';
DropDownPicker.setLanguage('EN');

const Soon = ({navigation, route}: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems]: any = useState([]);
  const [mOpen, setMOpen] = useState(false);
  const [mValue, setMValue] = useState(null);
  const [mItems, setMItems]: any = useState([]);
  const [tempArray, setTempArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState();
  const [countries, setCountries] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);
  const [mLoading, setMLoading] = useState(false);

  const fruitList: any = [
    {
      label: 'Apple',
      value: 'apple',
      icon: () => (
        <Image
          source={require('../assets/allitems/apple.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Banana',
      value: 'banana',
      icon: () => (
        <Image
          source={{uri: 'https://countryflagsapi.com/png/af'}}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Orange',
      value: 'Orange',
      icon: () => (
        <Image
          source={require('../assets/allitems/orange.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Mango',
      value: 'Mango',
      icon: () => (
        <Image
          source={require('../assets/allitems/mango.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Apple1',
      value: 'apple1',
      icon: () => (
        <Image
          source={require('../assets/allitems/apple.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
    {
      label: 'Apple2',
      value: 'apple2',
      icon: () => (
        <Image
          source={require('../assets/allitems/apple.png')}
          style={{width: 30, height: 30}}
        />
      ),
    },
  ];

  const getDropDownList = () => {
    // Show the loading animation
    setLoading(true);

    // Get items from API
    axios
      .get('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8')
      .then(response => {
        let data = response.data.map((item: any) => {
          return {label: item.city, value: item.name};
        });
        // console.log(data);

        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  // Fetching the product list using th AP
  const BASE_URL = 'https://api.emaadmin.com/api';
  const getCountries = () => {
    setLoading(true);
    axios
      .get(BASE_URL + '/public/country/list')
      .then(response => {
        let data = response.data.data.map((country: any) => {
          // console.log(country);
          return {label: country.nameEN, value: country._id};
        });
        // console.log('Get Countries Data::', data);
        setCountries(data);
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Get Countries Error', error);
      });
  };

  // Get Municiplaities Listing
  const getMunicipalities = (id: any) => {
    setMLoading(true);
    axios
      .get(BASE_URL + `/public/municipality/list/${id}`)
      .then(response => {
        let data = response.data.data.map((country: any) => {
          // console.log(country);
          return {label: country.nameEN, value: country._id};
        });
        // console.log('Get Municipalities Data::', data);
        // setCountries(data);
        setMunicipalities(data);
        setMItems(data);
        setMLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.log('Get Municipalities Error', error);
      });
  };

  useEffect(() => {
    // getDropDownList();
    // setTempArray(fruitList);
    // setItems(fruitList);
    getCountries();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        // alignContent: 'center',
      }}>
      <TouchableOpacity
        onPress={async () => {
          await clearAll();
          navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }}>
        <Text style={{fontSize: 20}}>Delete Profile</Text>
      </TouchableOpacity>
      {/* Countries Drop Down */}
      <View
        style={{
          width: '75%',
          alignSelf: 'center',
          display: 'flex',
          marginTop: 25,
        }}>
        <DropDownPicker
          zIndex={9999}
          closeOnBackPressed={true}
          closeAfterSelecting={true}
          disableLocalSearch={true}
          addCustomItem={true}
          searchable={true}
          showArrowIcon={true}
          loading={loading}
          hideSelectedItemIcon={false}
          showTickIcon={true}
          placeholder="Select Country"
          // style={{width: 300}}
          open={open}
          onOpen={() => setMOpen(false)}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          onSelectItem={item => {
            setMItems([]);
            getMunicipalities(item.value);
          }}
          // multiple={true}
          mode="BADGE"
          // maxHeight={100}
          // autoScroll={true}
          // disabled={true}
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
          onChangeSearchText={text => {
            // getDropDownList();
            // filterItems(text);
            // console.log('text', text);
            let tempArray1;
            if (text.length > 0) {
              tempArray1 = countries.filter((item: any) => {
                if (item.label.includes(text)) {
                  // console.log(item.label);
                  return item;
                }
              });
              setItems(tempArray1);
              // console.log('temp Array1', tempArray1);
            } else {
              // console.log('else');

              setItems(countries);
            }
          }}
          listMode="FLATLIST"
          flatListProps={{
            initialNumToRender: 10,
          }}
        />
      </View>
      {/* Municipalities Drop Down */}
      <View
        style={{
          width: '75%',
          alignSelf: 'center',
          display: 'flex',
          marginTop: 25,
        }}>
        <DropDownPicker
          closeOnBackPressed={true}
          closeAfterSelecting={true}
          disableLocalSearch={true}
          addCustomItem={false}
          searchable={true}
          showArrowIcon={true}
          loading={mLoading}
          hideSelectedItemIcon={false}
          showTickIcon={true}
          placeholder="Municipalities"
          // style={{width: 300}}
          open={mOpen}
          onOpen={() => setOpen(false)}
          value={mValue}
          items={mItems}
          setOpen={setMOpen}
          setValue={setMValue}
          setItems={setMItems}
          theme="DARK"
          // onSelectItem={item => getMunicipalities(item.value)}
          // multiple={true}
          mode="BADGE"
          maxHeight={500}
          // autoScroll={true}
          // disabled={true}
          badgeDotColors={[
            '#e76f51',
            '#00b4d8',
            '#e9c46a',
            '#e76f51',
            '#8ac926',
            '#00b4d8',
            '#e9c46a',
          ]}
          onChangeSearchText={text => {
            // getDropDownList();
            // filterItems(text);
            // console.log('text', text);
            let tempArray1;
            if (text.length > 0) {
              tempArray1 = municipalities.filter((item: any) => {
                if (item.label.includes(text)) {
                  // console.log(item.label);
                  return item;
                }
              });
              setMItems(tempArray1);
              // console.log('temp Array1', tempArray1);
            } else {
              // console.log('else');

              setMItems(municipalities);
            }
          }}
          listMode="FLATLIST"
          flatListProps={{
            initialNumToRender: 12,
          }}
        />
      </View>
    </View>
  );
};
export default Soon;
