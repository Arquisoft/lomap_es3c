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
import { addMarkerToPod, createMap} from './markUtils/MarkUtils';
import MapEventHandler from './MapEventHandler';
import { Markers } from './Markers';
import e from 'express';
import Swal from 'sweetalert2';
import createMapWindow from '../homeView/CreateMap';


export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}

export interface MapListInfo{
    sites:any;
    setSites:any;
}

export interface LateralMenuInfo{
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
    sites:string[];
    setSites:any;
}

export interface MapMarkersState{
    session:Session;
    markers:any;
    setMarkers:any;
    selectedMap:any;
    setSelectedMap:any;
}

function Map(props:LateralMenuInfo) {
    
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [isSelected, setIsSelected] = useState(false);

    const addMarker = (marker: MarkerInfo) => {
        marker.coords = [selectedPosition[0], selectedPosition[1]];
        addMarkerToPod(props.selectedMap,marker,props.session);

        let aux = props.markers;
        aux.push(marker);
        props.setMarkers(aux);
    }

    const mapOnClick = (e :LatLng) =>{
        if(props.selectedMap == undefined){
            nuevoMapa();
        }else{
            setSelectedPosition([
                e.lat,
                e.lng
            ]);
            //Cuando hacemos click en el mapa indicamos que está seleccionado para desplegar el menu lateral
            setIsSelected(true);
        }
    }

    const nuevoMapa = () => {
        createMapWindow(props.session);
      };

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
