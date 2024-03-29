import {Solicitude, User} from '../shared/shareddtypes';

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
  // Hacer la llamada
  let response = await fetch(apiEndPoint+'/prueba/bbdd', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'data':data})
  });
  // Manejar el retorno
  switch (response.status) {
    case 200: return response.json();
  }
}
*/

// IMPLEMENTAR RESTO DE MÉTODOS

export async function checkRegister(userName:string, userWebId:string, provider:string):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/user/isRegistered?userName=' + userName + '&userWebId=' + userWebId + '&provider=' + provider);

  // Manejar el retorno
  switch (response.status) {
    case 200: 
        const { isRegistered } = await response.json();  
        return isRegistered;
    default: return true;
  }
}

export async function registerUser(userName:string, userWebId:string, provider:string){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  // Hacer la llamada
  let response = await fetch(apiEndPoint+'/user/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'userName':userName, 'userWebId':userWebId, 'provider':provider})
  });
  // Manejar el retorno
  switch (response.status) {
    case 200: return response.json();
  }
}

export async function existsUser(userName:string, provider:string):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/user/exists?userName=' + userName + '&provider=' + provider);

  // Manejar el retorno
  switch (response.status) {
    case 200: 
        const { exists } = await response.json();  
        return exists;
    default: return false;
  }
}

export async function existsSolicitude(receiverName:string, receiverProvider:string, senderName: string, senderProvider: string):Promise<boolean>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/solicitude/exists?receiverName=' + receiverName + 
  '&receiverProvider=' + receiverProvider + '&senderName=' + senderName+ '&senderProvider=' + senderProvider);

  // Manejar el retorno
  switch (response.status) {
    case 200: 
        const { exists } = await response.json();  
        return exists;
    default: return true;
  }
}

export async function registerSolicitude(receiverName: string, receiverProvider: string, senderName:string, senderProvider:string){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  // Hacer la llamada
  let response = await fetch(apiEndPoint+'/solicitude/add', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'senderName':senderName, 'senderProvider':senderProvider, 'receiverName':receiverName, 'receiverProvider':receiverProvider})
  });
  // Manejar el retorno
  switch (response.status) {
    case 200: return response.json();
  }
}

export async function getSolicitudes(userName:string, provider:string):Promise<Solicitude[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  let response = await fetch(apiEndPoint+'/solicitude/getAll?userName=' + userName + '&provider=' + provider);

  // Manejar el retorno
  switch (response.status) {
    case 200: 
        try {
            const { solicitudes } = await response.json();
            return solicitudes;
        } catch (error) {
            console.log("Error al parsear la respuesta: ", error);
            return [];
        }
    default: return [];
  }
}

export async function deleteSolicitude(receiverName: string, receiverProvider: string, senderName:string, senderProvider:string):Promise<any>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  // Hacer la llamada
  let response = await fetch(apiEndPoint+'/solicitude/delete', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'senderName':senderName, 'senderProvider':senderProvider, 'receiverName':receiverName, 'receiverProvider':receiverProvider})
  });
  // Manejar el retorno
  switch (response.status) {
    case 200: return response.json();
  }
}

export async function deleteUser(userWebId:string){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
  // Hacer la llamada
  let response = await fetch(apiEndPoint+'/user/delete', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({'userWebId':userWebId})
  });
  // Manejar el retorno
  switch (response.status) {
    case 200: return response.json();
  }
}
