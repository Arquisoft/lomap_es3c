import { getFile, overwriteFile, saveFileInContainer } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { JsonLdDocument } from "jsonld";
import { MarkerInfo } from "../Map";

export function createJSONLDPoint(marker: MarkerInfo): File {
    const { name, comments, score, categoria, coords } = marker;
  
    let place: JsonLdDocument = {
      "@context": "https://schema.org/",
      "@type": "Place",
      "name": name,
      "latitude": coords[0],
      "longitude": coords[1],
      "category":categoria,
      "score":score,
      "comment":comments
  };

  let blob = new Blob([JSON.stringify(place)], { type: "application/ld+json" });
  return new File([blob], place.name + ".jsonld", { type: blob.type });
}



export async function addMarkerToPod(marker: MarkerInfo,session:SessionInfo) {

  let markerFile = createJSONLDPoint(marker);

  // Guardar los cambios en el pod
  try{
    await overwriteFile(
      "https://israel11.inrupt.net/private/prueba",
      markerFile,
      { contentType: markerFile.type, fetch: session.fetch }
    );
  }catch(e){
    console.error(e);
  }
}

export async function getMarkersFromPod(session:SessionInfo){
  let file = await getFile("https://israel11.inrupt.net/public/filenameprueba.jsonld", { fetch: session.fetch });
}