const seeProduct = function (obj: Object) {
  return sessionStorage.setItem('TheProduct', JSON.stringify(obj))
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
  }
}
const getSalePrice = function (thePrice: any, salePercentage: any) {
  const theSale = thePrice - (thePrice * salePercentage) / 100
  return Math.ceil(theSale)
}
export { seeProduct, displayProduct, getFromCart, getSalePrice }
