const seeProduct = function (product) {
  return sessionStorage.setItem('TheProduct', JSON.stringify(product))
}
const displayProduct = function () {
  const gettedObject = sessionStorage.getItem('TheProduct')
  if (gettedObject !== null) {
    const returnIt = JSON.parse(gettedObject)
    return returnIt
  }
}
const getFromCart = function () {
  const addedObjects = localStorage.getItem('cart')
  if (addedObjects !== null) {
    const displayIt = JSON.parse(addedObjects)
    return displayIt
  } else {
    return []
  }
}

const getSalePrice = function (thePrice, salePercentage) {
  const theSale = thePrice - (thePrice * salePercentage) / 100
  return Math.ceil(theSale)
}
export { seeProduct, displayProduct, getFromCart, getSalePrice }
