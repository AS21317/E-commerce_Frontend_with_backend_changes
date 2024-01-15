

export   function createProduct(product) {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/products/',{
    method:'POST',
    body:JSON.stringify(product),
    headers:{'content-type':'application/json'},
  })
const data = await response.json()
resolve ({data})}
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export   function fetchAllProducts() {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/products')
const data = await response.json()
resolve ({data})}
  );
}


export   function fetchProductById(id) {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/products/'+id)
const data = await response.json()
resolve ({data})}
  );
}


export   function fetchAllCategories() {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/categories')
const data = await response.json()
resolve ({data})}
  );
}



export   function fetchAllBrands() {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/brands')
const data = await response.json()
resolve ({data})}
  );
}

export   function fetchAllProductsByFilters(filter,sort,pagination) {

  
  console.log("passed object is : ", filter);
  // Formate of filter and sort object to pass it in api

 //filter= {"category":["smartPhone", "laptop","fragrance"]}
 //sort = {_sort:"price", _order:"desc"}
 // pagination = {_page:1, _limit:10} --> sample of query string 
 //TODO: Server will filter the deleted product in case of non-admin


 let queryString = '';
 
 for (let key in filter) {
   const categoryvalues = filter[key];
   console.log("Hii here! ", filter[key]);
   if(categoryvalues.length)
   {

     const lastCategoryValue = categoryvalues[categoryvalues.length-1];
     console.log("Last value: ",lastCategoryValue);
     queryString+= `${key}=${lastCategoryValue}&`

     
    }
    console.log( "String is in filter  ",queryString);
  }

  for (let key in sort)
  {
    queryString+= `${key}=${sort[key]}&`

    console.log( "String is in sort  ",queryString);
  }


  for (let key in pagination)
  {
    queryString+= `${key}=${pagination[key]}&`

    console.log( "String is in sort  ",queryString);
  }
 
 


  return new Promise(async (resolve) =>{
  const response = await fetch('http://localhost:8080/products?'+queryString)
const data = await response.json()
const totalItems = await response.headers.get('X-Total-Count') //json server give us total onject in header , recieving that here 
resolve ({data:{products:data,totalItems:+totalItems}})}  // + is used to convert it into numbers 
  );
}
