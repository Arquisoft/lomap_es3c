import { Session } from "@inrupt/solid-client-authn-browser";

import {
  addUrl,
  getFile,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrlAll,
  saveSolidDatasetAt,
  setThing,
  setUrl
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf";

export async function getFriendsFromPod(session) {

  try {
    
    const webId = session.info.webId;
    //console.log(webId)
    let profileDataset = await getSolidDataset(webId);
    let profileThing = getThing(profileDataset, webId);
    if (profileThing != null) {
      var conocidos = getUrlAll(profileThing, FOAF.knows);
      
      var amigos = Array();
      for(var i = 0; i < conocidos.length; i++) {
        let profileConocidoDataset = await getSolidDataset(conocidos[i]);
        let profileConocidoThing = getThing(profileConocidoDataset, conocidos[i]);
        if (profileConocidoThing != null) {
          var conocidosDelConocido = getUrlAll(profileConocidoThing, FOAF.knows);
          for(var j = 0; j < conocidosDelConocido.length; j++) {
            if(conocidosDelConocido[j] == webId) {
              amigos.push(conocidos[i]);
            }
          }          
        }
      }

      return amigos
    }
    
  } catch (error) {
    console.log(error)
  }
    
  return ['']
}

export async function getFriendsNamesFromPod(friendsUrls) {
  
  try {    
    var nombreAmigos = Array();
    for(var i = 0; i < friendsUrls.length; i++) {
      //console.log(friendsUrls[i])
      let profileAmigoDataset = await getSolidDataset(friendsUrls[i]);
      let profileAmigoThing = getThing(profileAmigoDataset, friendsUrls[i]);
      if (profileAmigoThing != null) {
        nombreAmigos.push(getStringNoLocale(profileAmigoThing, FOAF.name));
      }
    }
    //console.log(nombreAmigos)
    return nombreAmigos
  
  } catch (error) {
    console.log(error)
  }
  
  return ['']
}

//Para obtener los mapas de tu amigo.
export async function getFriendsMapsFromPod(friendUrl, session) {
  try {    
    const mapaAmigoUrl = friendUrl.replace("/profile/card#me", "/private/maps");
    var file = await getFile(mapaAmigoUrl, { fetch: session.fetch });
    const content = await file.text();
    console.log(content);    
  
  } catch (error) {
    console.log(error)
  }
  
  return ['']
}


//Añadir a knows.
export async function addToKnowInPod(session, nuevoConocido) {
  
  const webId = session.info.webId;

  try { 
    let profileDataset = await getSolidDataset(webId);
    let profileThing = getThing(profileDataset, webId);
    
    if (profileThing != null) {

      var sonAmigos = false;
      var conocidos = getUrlAll(profileThing, FOAF.knows);
      for(var i = 0; i < conocidos.length; i++) {
        if(conocidos[i]== nuevoConocido) {
          console.log("ya es amigo");
          sonAmigos = true;
        }  
      }

      if(!sonAmigos) {
        console.log("estoy aqui")
        profileThing = addUrl(
          profileThing,
          FOAF.knows,
          nuevoConocido
        );

        profileDataset = setThing(
          profileDataset,
          profileThing
        );
      
        await saveSolidDatasetAt(
          session.info.webId,
          profileDataset,
          { fetch: session.fetch }
        );
      }
    }

  } catch (error) {
    console.log(error)
  }
}