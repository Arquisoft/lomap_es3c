import { getFile, overwriteFile } from "@inrupt/solid-client";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { JsonLdDocument, NodeObject, fromRDF } from "jsonld";
import { MarkerInfo } from "../Map";

let file: any;

export async function createJSONLDPoint(marker: MarkerInfo) {
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

  jsonld.push(place);

  // Crea un nuevo archivo JSON-LD con el objeto actualizado
  const updatedContent = JSON.stringify(jsonld);
  const updatedFile = new File([updatedContent], file.name, { type: file.type });

  // Devuelve el nuevo archivo JSON-LD
  return updatedFile;
}

export async function addMarkerToPod(marker: MarkerInfo, session: SessionInfo) {

  let markerFile = await createJSONLDPoint(marker);

  // Guardar los cambios en el pod
  try {
    await overwriteFile(
      "https://israel11.inrupt.net/private/locations",
      markerFile,
      { contentType: markerFile.type, fetch: session.fetch }
    );
  } catch (e) {
    console.error(e);
  }
}

export async function getMarkersFromPod(session: SessionInfo) {
  try {
    file = await getFile("https://israel11.inrupt.net/private/locations", { fetch: session.fetch });
  } catch (e) {
    let blob = new Blob([], { type: "application/ld+json" });
    file = new File([blob], "locations.jsonld", { type: blob.type });
  }
  // Lee el contenido del archivo JSON-LD como una cadena
  const content = await file.text();
  // Parsea el contenido JSON-LD en un objeto JavaScript
  const parsedContent = JSON.parse(content);

  const markers:MarkerInfo[] = parsedContent.map((marker: any) => ({
    name: marker.name,
    comments: marker.comments,
    score: marker.score,
    categoria: marker.categoria,
    coords: [marker.latitude, marker.longitude]
  }));

  return markers;
}
