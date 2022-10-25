import axios from "axios";
import { useState } from "react";
import { getItem, setItem } from "./AsyncAPI";


export const getProductList = (
    setProductList: any,
    setLoader: any,
) => {
    
    setLoader(true)
    axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
            // console.log(response.data);
            setProductList(response.data)
            setLoader(false)
        })
        .catch((error) => {
            setLoader(false)
            console.log(error);
        });
};




export const getProductDetails = (
    setProductData: any,
    setLoader: any,
    id: any
) => {
    setLoader(true)
    axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
            // console.log(response.data);
            
            setProductData(response.data)
            setLoader(false)
        })
        .catch((error) => {
            setLoader(false)
            console.log(error);
        });
};




// const [status, setLoginStatus] = useState(false);
let status = 'false';
export const loginStatus = (Status: any) => {
    // console.log('loginStatus', setLoginStatus);
    // setLoginStatus(Status)
    status = Status;
    setItem('loginStatus', Status);
    // return setLoginStatus;
}

export const getLoginStatus = async () => {
    
    status =await getItem('loginStatus')
    console.log('getLoginStatus', status);
    return JSON.parse(status);
}