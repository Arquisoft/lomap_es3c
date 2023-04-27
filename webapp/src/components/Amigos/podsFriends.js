import {
  addUrl,
  createAclFromFallbackAcl,
  getFile,
  getResourceAcl,
  getSolidDataset,
  getSolidDatasetWithAcl,
  getStringNoLocale,
  getThing,
  getUrlAll,
  hasResourceAcl,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentDefaultAccess,
  setAgentResourceAccess,
  setThing
} from "@inrupt/solid-client";

import { FOAF } from "@inrupt/vocab-common-rdf";

import { getMapsFriendFromPod } from "../map/markUtils/MarkUtils";

export async function getFriendsFromPod(session) {

  try {

    const webId = session.info.webId;
    //console.log(webId)
    let profileDataset = await getSolidDataset(webId);
    let profileThing = getThing(profileDataset, webId);
    if (profileThing != null) {
      var conocidos = getUrlAll(profileThing, FOAF.knows);

      var amigos = Array();
      for (var i = 0; i < conocidos.length; i++) {
        let profileConocidoDataset = await getSolidDataset(conocidos[i]);
        let profileConocidoThing = getThing(profileConocidoDataset, conocidos[i]);
        if (profileConocidoThing != null) {
          var conocidosDelConocido = getUrlAll(profileConocidoThing, FOAF.knows);
          for (var j = 0; j < conocidosDelConocido.length; j++) {
            if (conocidosDelConocido[j] == webId) {
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
    for (var i = 0; i < friendsUrls.length; i++) {
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
  //const mapaAmigoUrl = friendUrl.replace("/profile/card#me", "/private/lomap/");

  try {
    let res = await getMapsFriendFromPod(session,friendUrl);

    return res;

  } catch (e) {
    console.error(e);
  }

  return ['']
}

export async function getMarkersOfFriendMapFromPod(session, friendUrl, mapName) {
  const mapaAmigoUrl = friendUrl.replace("/profile/card#me", "/private/lomap/" + mapName);
  let file = await getFile(mapaAmigoUrl, { fetch: session.fetch });
  const content = await file.text();

  // Parsea el contenido JSON-LD en un objeto JavaScript
  const parsedContent = JSON.parse(content);

  const markers = parsedContent.spatialCoverage.map((marker) => ({
    name: marker.name,
    comments: marker.comment,
    images: marker.image,
    coords: [marker.latitude, marker.longitude]
  }));

  return markers;
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
      for (var i = 0; i < conocidos.length; i++) {
        if (conocidos[i] == nuevoConocido) {
          console.log("ya es amigo");
          sonAmigos = true;
        }
      }

      if (!sonAmigos) {
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

export async function grantReadAccessToFriend(session, friendUrl, mapName) {

  let urlMapa = session.info.webId.replace("/profile/card#me", "/private/lomapImages/");

  const recurso = await getSolidDatasetWithAcl(urlMapa, { fetch: session.fetch });

  let acl;
  if (hasResourceAcl(recurso)) {
    acl = getResourceAcl(recurso);
  } else {
    acl = createAclFromFallbackAcl(recurso);
  }

  let nuevoAcl = setAgentResourceAccess(
    acl,
    friendUrl,
    { read: true, append: false, write: false, control: false }
  );

  nuevoAcl = setAgentDefaultAccess(
    nuevoAcl,
    friendUrl,
    { read: true, append: false, write: false, control: false }
  );

  await saveAclFor(recurso, nuevoAcl, { fetch: session.fetch });

  console.log("Done")
}