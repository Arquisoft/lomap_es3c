import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { MarkerInfo } from "./Map";
import { Session } from "@inrupt/solid-client-authn-browser";

export interface MarkersProps{
    session:Session;
    marker:MarkerInfo[];
    selectedCategories?:string[];
    setSelectedCategories?:any;
    setIsViewPointDrawerSelected:any;
    setSelectedMarker:any;
}

export function Markers(props:MarkersProps){

    let filteredMarkers:MarkerInfo[] = props.marker;

    if(props.selectedCategories!==undefined && props.selectedCategories.length>0){
        filteredMarkers = props.marker.filter(marker => {
            // Verificar si props.selectedCategories está definido y contiene marker.categoria
            return props.selectedCategories?.includes(marker.categoria);
        });
    }

    return (
        <div>
            {filteredMarkers.map((markerInfo, idx) =>
                <Marker key={`marker-${idx}`} position={markerInfo.coords} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })} eventHandlers={{
                    click: (e) => {
                      props.setSelectedMarker(markerInfo);
                      props.setIsViewPointDrawerSelected(true);
                    },
                  }}>
                </Marker>
            )}
        </div>
    )

}