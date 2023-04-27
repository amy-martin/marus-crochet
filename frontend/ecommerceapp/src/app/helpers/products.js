const retrieveProduct = async (productID=1) => {
    const response = await fetch(`http://localhost:3000/product/${productID}`)
    const json = await response.json();
    const product = json.product
    return product
}

const retrieveProducts = async (category=null) => {
    let response
    if (category) {
        response = await fetch(`http://localhost:3000/products/${category}`)
    } else {
        response = await fetch('http://localhost:3000/products');
    }
    const json = await response.json();
    const products = json.products
    return products
}



module.exports = { retrieveProduct, retrieveProducts }
