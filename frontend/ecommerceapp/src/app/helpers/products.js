import { serverAddress } from "../App";

export const retrieveProduct = async (productID) => {
    const response = await fetch(`${serverAddress}/product/${productID}`)
    const json = await response.json();
    const product = json.product
    return product
}

export const retrieveProducts = async (category=null) => {
    let response
    if (category) {
        response = await fetch(`${serverAddress}/products/${category}`)
    } else {
        response = await fetch(`${serverAddress}/products`);
    }
    const json = await response.json();
    const products = json.products
    return products
}

export const retrieveNewProducts = async () => {
    const response = await fetch(`${serverAddress}/new`);
    const json = await response.json();
    const products = json.products
    return products
}

