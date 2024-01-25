

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function signOut(userid) {
  return new Promise(async (resolve) => {
    
    // TODO: on server it will remove user session Info
    resolve({ data:'success' });
  });
}




export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {

 
try{
  const response = await fetch('http://localhost:8080/auth/login ',{
    method: 'POST',
    body: JSON.stringify(loginInfo),
    headers: { 'content-type': 'application/json' },

  });
    // found that 401 bhi try ke ander ek successfull case hai , means server ka error code ka error nhi ho pa rha hai , so we use res.ok 

  if(response.ok)
  {
    const data = await response.json();
    console.log("data after searching the given email to server: ",data);
      
    resolve({data})   // data ko as a object hi send krna hai , otherwise resolve nhi hoga 
  }
  else{
    const err = await response.json();
    reject(err)  // ye error backend se aayegi with 401 status , and we need to catch it in asyncThunk and send it in action error of thunk
  }
  
} catch(err){
  reject(err)
}
  }) ;
}


