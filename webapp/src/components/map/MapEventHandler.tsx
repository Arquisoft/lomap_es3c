import { useMapEvents } from "react-leaflet";

export interface MapEventHandlerProps {
    onClick: (latlng: L.LatLng) => void;
}

function MapEventHandler(props:MapEventHandlerProps){

    useMapEvents({
        click: (event) => {
          const { latlng } = event;
          props.onClick(latlng);
        },
      });
    return null;
}

export default MapEventHandler