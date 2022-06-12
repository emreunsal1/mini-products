import generaJson from './general.json'

let categorieList = [];
  categorieList =  generaJson.responses[0][0].params.userCategories

  if(categorieList.length == 0) {
    categorieList = false;
  }

 
 export default categorieList;