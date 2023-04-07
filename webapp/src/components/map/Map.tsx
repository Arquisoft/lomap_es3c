import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L, { Icon, LatLng, marker } from 'leaflet';
import MapDrawer from './drawer/MapDrawer';
import PlaceDrawer from './drawer/MapDrawer';

import {
    saveFileInContainer,
    getThingAll,
    SolidDataset,
    getFile
} from "@inrupt/solid-client";
import {Session, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { useSession } from "@inrupt/solid-ui-react";
import { addMarkerToPod} from './markUtils/MarkUtils';
import MapEventHandler from './MapEventHandler';
import { Markers } from './Markers';
import e from 'express';


export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}

export interface MapMarkersState{
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
}

function Map(props:MapMarkersState) {
    
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [isSelected, setIsSelected] = useState(false);

    const addMarker = (marker: MarkerInfo) => {
        marker.coords = [selectedPosition[0], selectedPosition[1]];
        addMarkerToPod(props.selectedMap,marker,props.session);
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
            <Markers marker={props.markers}></Markers>
            <PlaceDrawer opened={isSelected} onSubmit={addMarker}  toggleDrawer={toggleDrawer}></PlaceDrawer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );


}
export default Map;
