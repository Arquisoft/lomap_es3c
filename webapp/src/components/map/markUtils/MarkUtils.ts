import { Access, WithResourceInfo, createAclFromFallbackAcl, createContainerAt, getContainedResourceUrlAll, getFile, saveAclFor, getResourceAcl, getSolidDataset, getSolidDatasetWithAcl, hasAccessibleAcl, hasFallbackAcl, hasResourceAcl, overwriteFile, setAgentResourceAccess, saveFileInContainer, universalAccess, setAgentDefaultAccess, getAgentResourceAccess, getFileWithAcl, saveSolidDatasetAt } from "@inrupt/solid-client";
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
  const { name, categoria, description, images, coords } = marker;

  let auxImages = [];

  for (let imageI of images) {
    auxImages.push({
      "@context": "https://schema.org/",
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
      "identifier": (session.info.webId?.split('/profile')[0] || 'error')
    },
    "additionalType": categoria,
    "latitude": coords[0],
    "longitude": coords[1],
    "description": description,
    "review": [],
    "image": auxImages,
    "dateCreated": Date.now()
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
      authorWebId: marker.author.identifier,
      name: marker.name,
      categoria: marker.additionalType,
      images: marker.image,
      review: marker.review,
      coords: [marker.latitude, marker.longitude]
    }));

    return markers;
  } catch (e) {
    console.error(e)
  }
}

export async function updateMarkerReview(session: Session, marker: MarkerInfo, selectedMap: string) {
  await getMapFromPod(session, selectedMap, marker.authorWebId + "/private/lomap/");
  try {
    const parsedContent = JSON.parse(selectedMapFile);
    for (const element of parsedContent.spatialCoverage) {
      if (marker.name == element.name) {
        element.review = marker.review;
        break;
      }
    }
    const updatedContent = JSON.stringify(parsedContent);

    const updatedFile = new File([updatedContent], parsedContent.name, { type: "application/ld+json" });
    await overwriteFileInPod(session, updatedFile, marker.authorWebId + "/private/lomap/" + selectedMap);
  } catch (error) { }
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

  return true;
}

export async function getMapsFriendFromPod(session: Session, friendUrl: string) {
  let url = (friendUrl.split('/profile')[0] + '/private/lomap/');
  let urls2: string[] = [];
  await getValidUrls(session, url, urls2)

  await Promise.all(urls2.map(async (url) => {
    return url;
  }));
  return urls2;
}

async function getValidUrls(session: Session, url: string, urls2: string[]) {
  try {
    let urls = await getUrlsOfDataset(session, url);

    await Promise.all(urls.map(async (element) => {
      urls2.push(element.split("/lomap/")[1]);
    }));
  } catch (e) { }
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

export async function getMapFromPod(session: Session, mapId: string, url?: string) {
  const urlContainer = getMapUrl(session, url);
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

export async function getImageFromPod(session: Session, url: string) {
  try {
    let podUrl = url;
    let resImg: any = await getFile(podUrl, { fetch: session.fetch });
    return resImg;
  } catch (e) {
  }
}