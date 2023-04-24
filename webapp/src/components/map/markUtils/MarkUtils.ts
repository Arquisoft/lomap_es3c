import { Access, WithResourceInfo, createAclFromFallbackAcl, createContainerAt, getContainedResourceUrlAll, getFile, saveAclFor, getResourceAcl, getSolidDataset, getSolidDatasetWithAcl, hasAccessibleAcl, hasFallbackAcl, hasResourceAcl, overwriteFile, setAgentResourceAccess, saveFileInContainer, universalAccess, setAgentDefaultAccess, getAgentResourceAccess, getFileWithAcl } from "@inrupt/solid-client";
import { JsonLdDocument } from "jsonld";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";
import { getSolidDatasetWithAccessDatasets } from "@inrupt/solid-client/dist/acp/acp";
import { v4 as uuidv4 } from 'uuid';
import { LinkedResourceUrlAll } from "@inrupt/solid-client/dist/interfaces";
import Swal from "sweetalert2";
import { setAgentAccess } from "@inrupt/solid-client/dist/universal";
import { grantReadAccessToFriend } from "../../Amigos/podsFriends";

let selectedMapFile: string;

export async function createJSONLDPoint(session: Session, marker: MarkerInfo) {
  const { name, categoria, images, coords } = marker;

  let auxImages = [];

  for (let imageI of images) {
    auxImages.push({
      "@type": "ImageObject",
      "author": {
        "@type": "Person",
        "identifier": (session.info.webId?.split('/profile')[0] || 'error')
      },
      "contentUrl": imageI as string
    })
  }

  let place: JsonLdDocument = {
    "@context": "https://schema.org/",
    "@type": "Place",
    "identifier": uuidv4(),
    "name": name,
    "author": {
      "@type": "Person",
      "identifier": "_WebId_"
    },
    "additionalType": categoria,
    "latitude": coords[0],
    "longitude": coords[1],
    "description": "_Marker's-Description_",
    "review": [],
    "image": auxImages,
    "dateCreated": "_Marker's-Creation-Date_"
  };

  // Lee el contenido del archivo JSON-LD como una cadena
  const content = selectedMapFile;

  // Parsea el contenido JSON-LD en un objeto JavaScript
  const jsonld = JSON.parse(content);

  jsonld.spatialCoverage.push(place);

  // Crea un nuevo archivo JSON-LD con el objeto actualizado
  const updatedContent = JSON.stringify(jsonld);

  const updatedFile = new File([updatedContent], jsonld.name, { type: "application/ld+json" });

  selectedMapFile = updatedContent;

  // Devuelve el nuevo archivo JSON-LD
  return updatedFile;
}

export async function addMarkerToPod(selectedMap: string, marker: MarkerInfo, session: Session) {
  let markerFile = await createJSONLDPoint(session, marker);

  overwriteFileInPod(session, markerFile, getMapUrl(session) + selectedMap);
}

export async function getMarkersOfMapFromPod(session: Session, mapName: string) {
  await getMapFromPod(session, mapName);
  try {
    // Parsea el contenido JSON-LD en un objeto JavaScript
    const parsedContent = JSON.parse(selectedMapFile);

    const markers: MarkerInfo[] = parsedContent.spatialCoverage.map((marker: any) => ({
      name: marker.name,
      categoria: marker.category,
      images: marker.image,
      coords: [marker.latitude, marker.longitude]
    }));

    return markers;
  } catch (e) {
    console.error(e)
  }
}

export async function getMapsFromPod(session: Session) {
  let url = getMapUrl(session);

  let urls = await getUrlsOfDataset(session, url);

  return urls.map(url => url.split("/lomap/")[1]);
}

async function checkIfDatasetExists(session: Session, url: string) {
  let dataset;
  try {
    dataset = await getSolidDataset(url, { fetch: session.fetch });
  } catch (e) {
    console.error(e)
    await createContainerAt(url, { fetch: session.fetch });
    dataset = await getSolidDataset(url, { fetch: session.fetch });
  }
  return dataset;
}

export async function getUrlsOfDataset(session: Session, url: string) {
  let dataset = await checkIfDatasetExists(session, url);

  return getContainedResourceUrlAll(dataset);
}

async function checkIfMapExists(session: Session, mapName: string) {
  let mapUrl = getMapUrl(session);
  let urls = await getUrlsOfDataset(session, mapUrl);
  return !urls.includes(mapUrl + mapName);
}

export async function createMap(session: Session, mapName: string) {

  let isValidName = await checkIfMapExists(session, mapName);

  if (!isValidName) {
    return false;
  }

  let map: JsonLdDocument = {
    "@context": "https://schema.org",
    "@type": "Map",
    "identifier": uuidv4(),
    "name": mapName,
    "author": {
      "@type": "Person",
      "identifier": (session.info.webId?.split('/profile')[0] || 'error')
    },
    "spatialCoverage": []
  };

  let blob = new Blob([JSON.stringify(map)], { type: "application/ld+json" });

  let file = new File([blob], mapName + ".jsonld", { type: blob.type });

  await overwriteFileInPod(session, file, getMapUrl(session) + mapName);

  await grantReadAccessToFriend(session, "https://lomapes3c.inrupt.net/profile/card#me", mapName);

  return true;
}


export async function overwriteFileInPod(session: Session, file: File, url?: string) {
  // Guardar los cambios en el pod
  try {
    await overwriteFile(
      url !== undefined ? url : (session.info.webId?.split('/profile')[0] + '/public/maps' || ''), //TODO: Cambiar public por private
      file,
      { contentType: file.type, fetch: session.fetch }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function saveImageInPod(session: Session, file: File, fileName: string) {
  // Guardar los cambios en el pod
  try {
    await saveFileInContainer(
      getImageUrl(session),
      file,
      { contentType: file.type, slug: fileName, fetch: session.fetch }
    );
  } catch (e) {
    await createContainerAt(getImageUrl(session), { fetch: session.fetch });
    await saveFileInContainer(
      getImageUrl(session),
      file,
      { contentType: file.type, slug: fileName, fetch: session.fetch }
    );
  }
}

export async function getMapFromPod(session: Session, mapId: string) {
  const urlContainer = getMapUrl(session);
  try {
    let mapUrl = urlContainer + mapId; //TODO: Cambiar public por private
    let mapFile = await getFile(mapUrl, { fetch: session.fetch });
    selectedMapFile = await mapFile.text();
    return mapFile;
  } catch (e) {
    console.error(e);
    try {
      await createContainerAt(urlContainer, { fetch: session.fetch });
    } catch (e) {
      console.error(e);
    }
  }
}

export function getMapUrl(session: Session, baseUrl?: string) {
  return baseUrl !== undefined ? baseUrl : (session.info.webId?.split('/profile')[0] + '/private/lomap/' || '');
}
function getImageUrl(session: Session) {
  return (session.info.webId?.split('/profile')[0] + '/private/lomapImages/' || '');
}

export async function getImageFromPod(session: Session, name: string) {
  console.log(name)
  try {
    let podUrl = getImageUrl(session) + name;
    let resImg: any = await getFile(podUrl, { fetch: session.fetch });
    return resImg;
  } catch (e) {
  }
}