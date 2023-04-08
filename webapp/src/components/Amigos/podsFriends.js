import { Session } from "@inrupt/solid-client-authn-browser";

import {
  getFile,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrlAll
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf";

export async function getFriendsFromPod(session) {

  try {
    
    const webId = session.info.webId;
    //console.log(webId)
    let profileDataset = await getSolidDataset(webId);
    let profileThing = getThing(profileDataset, webId);
    
    if (profileThing != null) {
      var amigos = getUrlAll(profileThing, FOAF.knows);
      //console.log(amigos)
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