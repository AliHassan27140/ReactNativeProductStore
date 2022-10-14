import axios from "axios";


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
            console.log(response.data);
            
            setProductData(response.data)
            setLoader(false)
        })
        .catch((error) => {
            setLoader(false)
            console.log(error);
        });
};