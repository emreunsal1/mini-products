import genralJson from './general.json'



export const getProductList = (selectedProduct = "Size Özel") => {
  const productList =  genralJson.responses[0][0].params.recommendedProducts[selectedProduct]
  if(productList.length > 0 ){
    return productList;
  }
  return false;
}

