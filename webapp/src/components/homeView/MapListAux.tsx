import { Session } from "@inrupt/solid-client-authn-browser";
import MapsList from "./MapsList";

export interface MapListState{
    children: [];
    open:boolean;
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
    sites:string[];
    setSites:any;
    editable?: boolean;
    setEditable: any;
    friendsURL:string[];
    friendsNames:string[];
    mySelectedMap:number;
    setMySelectedMap:any;
}

function MapListAux(props: MapListState) {
    if (props.open) {
        return (<MapsList session={props.session} markers={props.markers} setMarkers={props.setMarkers} selectedMap={props.selectedMap} setSelectedMap={props.setSelectedMap} sites={props.sites} setSites={props.setSites} editable={props.editable} setEditable={props.setEditable} friendsURL={props.friendsURL} friendsNames={props.friendsNames} mySelectedMap={props.mySelectedMap} setMySelectedMap={props.setMySelectedMap}></MapsList>);
    } else {
        return (<></>);
    }
}

export default MapListAux;