const retrieveProduct = async (productID=1) => {
    const response = await fetch(`http://localhost:3000/products/${productID}`)
    const json = await response.json();
    const product = json.product
    return product
}

const retrieveProducts = async () => {
    const products = await fetch('http://localhost:3000/products');
    return products
}

module.exports = { retrieveProduct, retrieveProducts}
