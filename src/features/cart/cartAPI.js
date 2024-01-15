

export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}



export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}


export function deleteItemFromCart(itemId) {

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart/'+itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });
    // abobe operation se db se to delete ho gya but return me kuch nhi aayega via json server , then hme aasync ko explicitly deleted item ki id send krni hogi , so that frontend ki cart bucket i.e cartItems se bhi vo delete kiya ja ske 
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    console.log("Data ater deletion :",data);
    resolve({ data:{id:itemId} });
  });
}


export  function resetCart(userId) {

  // पहले तो किसी particular यूजर के सारे cart item लेके आओ 
  // then delete each of them , which has been placed for order 
  
  return new Promise (async (resolve)=>{
    const response =  await fetchItemsByUserId(userId)
    const items = response.data

    for(let item of items) 
    {
      await deleteItemFromCart(item.id)
    }
    resolve({status:'Success'})
  })
    
 
 
}






export   function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) =>{const response = await fetch('http://localhost:8080/cart?user='+userId)
const data = await response.json()
resolve ({data})}
  );
}