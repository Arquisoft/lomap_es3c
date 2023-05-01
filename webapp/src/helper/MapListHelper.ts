import { Session } from "@inrupt/solid-client-authn-browser";
import { getMapsFromPod, getMarkersOfMapFromPod } from "../solid/MarkUtils";

export async function loadSitesHelper(session:Session,setSites:any) {
    // Simula una función asincrónica para cargar los sitios
    let maps = await getMapsFromPod(session);
    let aux = maps.map(map=>{return decodeURIComponent(map)});
    setSites(aux);
}

export async function clickMapHelper(map: string,setEditable:any,session:Session,setMarkers:any,setSelectedMap:any,setMySelectedMap:any,sites:any) {
    setEditable(true);
    let markers = await getMarkersOfMapFromPod(session,map);
    setMarkers(markers);
    setSelectedMap(map);
    setMySelectedMap(sites.indexOf(map));
}