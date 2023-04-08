import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { MarkerInfo } from "./Map";

export interface MarkersProps{
    marker:MarkerInfo[];
}

export function Markers(props:MarkersProps){
    return (
        <div>
            {props.marker.map((markerInfo, idx) =>
                <Marker key={`marker-${idx}`} position={markerInfo.coords} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] }) }>
                    <Popup>
                        <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                    </Popup>
                </Marker>
            )}
        </div>
    )

}