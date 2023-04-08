import { Session } from "@inrupt/solid-client-authn-browser";

export interface MapInfo{
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
    sites:string[];
    setSites:any;
}