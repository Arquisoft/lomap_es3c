import {User} from '../shared/shareddtypes';

export async function addUser(user:User):Promise<boolean>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'name':user.name, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

// BBDD Conf 4/6 - Invocación a la RestAPI
/*
export async function pruebaBBDD(data:String){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/prueba/bbdd', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'data':data})
  });
  switch (response.status) {
    case 200: return response.json();
  }
}
*/
