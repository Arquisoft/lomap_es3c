import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L, { Icon, LatLng } from 'leaflet';
import MapDrawer from './drawer/MapDrawer';
import PlaceDrawer from './drawer/MapDrawer';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {
    saveFileInContainer,
    getThingAll,
    SolidDataset,
    getFile
} from "@inrupt/solid-client";
import {handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { useSession } from "@inrupt/solid-ui-react";
import { addMarkerToPod} from './markUtils/MarkUtils';
import MapEventHandler from './MapEventHandler';


export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}

function Map() {

    const session = useSession();

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [isSelected, setIsSelected] = useState(false);

    const [markers, setMarkers] = useState<MarkerInfo[]>([]);

    let myReadingList: SolidDataset;

    async function getMarkers() {
        const allThings = getThingAll(myReadingList);

        return (allThings.map((position, idx) =>
            <Marker key={`marker-${idx}`} position={[0, 0]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                <Popup>
                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                </Popup>
            </Marker>
        ));

    }

    handleRedirectAfterLogin();

    /*
    Funcion que procesa la informacion de inicio de sesion 
    */
    async function handleRedirectAfterLogin() {
        await handleIncomingRedirect(); //Obtiene la informacion de identificacion aportada por el identity provider
    }

    const addMarker = (marker: MarkerInfo) => {
        marker.coords = [selectedPosition[0], selectedPosition[1]];
        setMarkers([...markers, marker]);
        addMarkerToPod(marker,session);
    }

    const Markers = () => {
        return (
            <div>
                {markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position.coords} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] }) } eventHandlers={{
                        click: (e) => {
                          alert('marker clicked')
                        },
                      }}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                )}
            </div>
        )

    }

    const mapOnClick = (e :LatLng) =>{
        setSelectedPosition([
            e.lat,
            e.lng
        ]);
        //Cuando hacemos click en el mapa indicamos que está seleccionado para desplegar el menu lateral
        setIsSelected(true);
    }

    const toggleDrawer = (isSelected:boolean) =>{
        setIsSelected(isSelected);
    }

    return (
        <MapContainer
            className="map"
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
        >
            <MapEventHandler onClick={mapOnClick} />
            <Markers></Markers>
            <PlaceDrawer opened={isSelected} onSubmit={addMarker}  toggleDrawer={toggleDrawer}></PlaceDrawer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );


}
export default Map;
