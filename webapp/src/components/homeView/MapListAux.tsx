import { Session } from "@inrupt/solid-client-authn-browser";
import MapsList from "./MapsList";

export interface MapListState{
    open:boolean;
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
}

function MapListAux(props: MapListState) {
    if (props.open) {
        return (<MapsList session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} setSelectedMap={props.setSelectedMap}></MapsList>);
    } else {
        return (<></>);
    }
}

export default MapListAux;