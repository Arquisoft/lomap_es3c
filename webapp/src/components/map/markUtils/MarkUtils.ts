import { getFile, overwriteFile } from "@inrupt/solid-client";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { JsonLdDocument, NodeObject, fromRDF } from "jsonld";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";

let file: any;

export async function createJSONLDPoint(selectedMap: string, marker: MarkerInfo) {
  const { name, comments, score, categoria, coords } = marker;

  let place: JsonLdDocument = {
    "@context": "https://schema.org/",
    "@type": "Place",
    "name": name,
    "latitude": coords[0],
    "longitude": coords[1],
    "category": categoria,
    "score": score,
    "comment": comments
  };

  // Lee el contenido del archivo JSON-LD como una cadena
  const content = await file.text();

  // Parsea el contenido JSON-LD en un objeto JavaScript
  const jsonld = JSON.parse(content);

  const actualMap = jsonld.find((map: { name: string; }) => map.name === selectedMap);

  actualMap.locations.push(place);

  // Crea un nuevo archivo JSON-LD con el objeto actualizado
  const updatedContent = JSON.stringify(jsonld);
  const updatedFile = new File([updatedContent], file.name, { type: file.type });

  // Devuelve el nuevo archivo JSON-LD
  return updatedFile;
}

export async function addMarkerToPod(selectedMap: string, marker: MarkerInfo, session: Session) {
  await getFileFromPod(session);

  let markerFile = await createJSONLDPoint(selectedMap, marker);

  // Guardar los cambios en el pod
  try {
    await overwriteFile(
      "https://israel11.inrupt.net/private/maps",
      markerFile,
      { contentType: markerFile.type, fetch: session.fetch }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function getMarkersOfMapFromPod(session: Session, mapName: string) {
  await getFileFromPod(session);
  try {
    // Lee el contenido del archivo JSON-LD como una cadena
    const content = await file.text();
    // Parsea el contenido JSON-LD en un objeto JavaScript
    const parsedContent = JSON.parse(content);

    const map = parsedContent.maps.find((map: { name: string; }) => map.name === mapName);

    const markers: MarkerInfo[] = map.spatialCoverage.map((marker: any) => ({
      name: marker.name,
      comments: marker.comments,
      score: marker.score,
      categoria: marker.categoria,
      coords: [marker.latitude, marker.longitude]
    }));

    return markers;
  } catch (e) {
    console.error(e)
  }
}

export async function getMapsFromPod(session: Session) {
  await getFileFromPod(session);
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

export async function getFileFromPod(session: Session) {
  try {
    file = await getFile("https://israel11.inrupt.net/private/maps", { fetch: session.fetch });
  } catch (e) {
    let maps: JsonLdDocument = {
      "maps": []
    };
    let jsonString = JSON.stringify(maps);
    let blob = new Blob([jsonString], { type: "application/ld+json" });
    file = new File([blob], "maps.jsonld", { type: blob.type });
    // Guardar los cambios en el pod
    try {
      await overwriteFile(
        "https://israel11.inrupt.net/private/maps",
        file,
        { contentType: file.type, fetch: session.fetch }
      );
    } catch (e) {
      console.error(e);
    }
  }

}
