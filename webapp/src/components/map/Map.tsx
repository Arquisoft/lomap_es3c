import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L from 'leaflet';
import MapDrawer from './drawer/MapDrawer';
import AddPlaceDrawer from './drawer/MapDrawer';


function Map() {

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]); 

    const [isSelected, setIsSelected] =useState(false);

    const Markers = () => {

        const map = useMapEvents({
            click(e: { latlng: { lat: number; lng: number; }; }) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
                //Cuando hacemos click en el mapa indicamos que está seleccionado para desplegar el menu lateral
                setIsSelected(true);
            },
        })

        //Retornamos el menú lateral si hay una posición seleccionada
        return (
            selectedPosition ?
                <div> 
                <AddPlaceDrawer opened={isSelected}></AddPlaceDrawer>
                </div>
                : null
        )
    }

    return (
        <MapContainer
            className="map"
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
        >
            <Markers />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );


}
export default Map;

