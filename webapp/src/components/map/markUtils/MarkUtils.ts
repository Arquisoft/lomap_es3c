import { createContainerAt, getFile, overwriteFile, saveFileInContainer } from "@inrupt/solid-client";
import { JsonLdDocument} from "jsonld";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";

let file: any;

export async function createJSONLDPoint(selectedMap: string, marker: MarkerInfo) {
  const { name, comments, score, categoria,images, coords } = marker;

  let place: JsonLdDocument = {
    "@context": "https://schema.org/",
    "@type": "Place",
    "name": name,
    "latitude": coords[0],
    "longitude": coords[1],
    "category": categoria,
    "images":images as string[],
    "score": score,
    "comment": comments
  };

  // Lee el contenido del archivo JSON-LD como una cadena
  const content = await file.text();

  // Parsea el contenido JSON-LD en un objeto JavaScript
  const jsonld = JSON.parse(content);

  const actualMap = jsonld.maps.find((map: { name: string; }) => map.name == selectedMap);

  actualMap.spatialCoverage.push(place);

  // Crea un nuevo archivo JSON-LD con el objeto actualizado
  const updatedContent = JSON.stringify(jsonld);
  const updatedFile = new File([updatedContent], file.name, { type: file.type });

  // Devuelve el nuevo archivo JSON-LD
  return updatedFile;
}

export async function addMarkerToPod(selectedMap: string, marker: MarkerInfo, session: Session) {
  await getFileFromPod(session);

  let markerFile = await createJSONLDPoint(selectedMap, marker);

  overwriteFileInPod(session,markerFile);
}

export async function getMarkersOfMapFromPod(session: Session, mapName: string,url?:string) {
  await getFileFromPod(session,url);
  try {
    // Lee el contenido del archivo JSON-LD como una cadena
    const content = await file.text();
    // Parsea el contenido JSON-LD en un objeto JavaScript
    const parsedContent = JSON.parse(content);

    const map = parsedContent.maps.find((map: { name: string; }) => map.name === mapName);

    const markers: MarkerInfo[] = map.spatialCoverage.map((marker: any) => ({
      name: marker.name,
      comments: marker.comment,
      score: marker.score,
      categoria: marker.category,
      images:marker.images,
      coords: [marker.latitude, marker.longitude]
    }));

    return markers;
  } catch (e) {
    console.error(e)
  }
}

export async function getMapsFromPod(session: Session,url?:string) {
  await getFileFromPod(session,url);
  try {
    // Lee el contenido del archivo JSON-LD como una cadena
    const content = await file.text();
    // Parsea el contenido JSON-LD en un objeto JavaScript
    const parsedContent = JSON.parse(content);
    return parsedContent.maps.map((map: { name: string; }) => map.name);
  } catch (e) {
    console.error(e);
  }
}

export async function createMap(session:Session,mapName:string){
  await getFileFromPod(session);

  let map: JsonLdDocument = {
    "@context": "https://schema.org/",
    "@type": "Map",
    "name": mapName,
    "spatialCoverage": []
  };

  // Lee el contenido del archivo JSON-LD como una cadena
  const content = await file.text();

  // Parsea el contenido JSON-LD en un objeto JavaScript
  const jsonld = JSON.parse(content);

  jsonld.maps.push(map);

  const updatedContent = JSON.stringify(jsonld);
  const updatedFile = new File([updatedContent], file.name, { type: file.type });

  overwriteFileInPod(session,updatedFile);

  return jsonld.maps.map((map: { name: string; }) => map.name);
}

export async function overwriteFileInPod(session:Session,file:File,url?:string){
  // Guardar los cambios en el pod
  try {
    await overwriteFile(
      url !== undefined ? url : (session.info.webId?.split('/profile')[0]+'/public/maps'  || ''), //TODO: Cambiar public por private
      file,
      { contentType: file.type, fetch: session.fetch }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function saveImageInPod(session:Session,file:File,fileName:string){
  // Guardar los cambios en el pod
  try {
    await saveFileInContainer(
      (session.info.webId?.split('/profile')[0]+'/private/images'  || ''),
      file,
      { contentType: file.type,slug: fileName, fetch: session.fetch }
    );
  } catch (e) {
    await createContainerAt((session.info.webId?.split('/profile')[0]+'/private/images'  || ''), { fetch: session.fetch });
    await saveFileInContainer(
      (session.info.webId?.split('/profile')[0]+'/private/images'  || ''),
      file,
      { contentType: file.type,slug: fileName, fetch: session.fetch }
    );
  }
}

export async function getFileFromPod(session: Session,url?:string) {
  try {
    let podUrl = url !== undefined ? url : (session.info.webId?.split('/profile')[0]+'/public/maps'  || ''); //TODO: Cambiar public por private
    file = await getFile(podUrl, { fetch: session.fetch });
  } catch (e) {
    let maps: JsonLdDocument = {
      "@context": "https://schema.org/",
      "maps": []
    };
    let jsonString = JSON.stringify(maps);
    let blob = new Blob([jsonString], { type: "application/ld+json" });
    file = new File([blob], "maps.jsonld", { type: blob.type });
    overwriteFileInPod(session,file);
  }
}

export async function getImageFromPod(session: Session,name:string) {
  try {
    let podUrl = (session.info.webId?.split('/profile')[0]+'/private/images/'  || '')+name;
    file = await getFile(podUrl, { fetch: session.fetch });
    return file;
  } catch (e) {
  }
}
