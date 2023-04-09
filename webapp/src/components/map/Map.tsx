import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LatLng } from 'leaflet';
import PlaceDrawer from './drawer/MapDrawer';
import {Session } from '@inrupt/solid-client-authn-browser';
import { addMarkerToPod} from './markUtils/MarkUtils';
import MapEventHandler from './MapEventHandler';
import { Markers } from './Markers';
import createMapWindow from '../homeView/CreateMap';

export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}

export interface MapListInfo {
    sites: any;
    setSites: any;
}

export interface MapInfo {
    session: Session;
    markers: any;
    setMarkers: any;
    selectedMap: any;
    setSelectedMap: any;
    sites: string[];
    setSites: any;
    selectedCategories?:string[];
    setSelectedCategories?:any;
    editable?: boolean;
    setEditable: any;
}

function Map(props: MapInfo) {

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [isSelected, setIsSelected] = useState(false);

    const addMarker = (marker: MarkerInfo) => {
        marker.coords = [selectedPosition[0], selectedPosition[1]];
        addMarkerToPod(props.selectedMap, marker, props.session);

        let aux = props.markers;
        aux.push(marker);
        props.setMarkers(aux);
    }

    const mapOnClick = (e: LatLng) => {
        if(!(props.editable == undefined || props.editable === false)) {
            if (props.selectedMap == undefined) {
                nuevoMapa();
            } else {
                setSelectedPosition([
                    e.lat,
                    e.lng
                ]);
                //Cuando hacemos click en el mapa indicamos que está seleccionado para desplegar el menu lateral
                setIsSelected(true);
            }
        }        
    }

    const nuevoMapa = () => {
        createMapWindow(props.session);
    };

    const toggleDrawer = (isSelected: boolean) => {
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
            <Markers marker={props.markers} selectedCategories={props.selectedCategories} setSelectedCategories={props.setSelectedCategories}></Markers>
            <PlaceDrawer opened={isSelected} onSubmit={addMarker} toggleDrawer={toggleDrawer}></PlaceDrawer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer >
    );


}
export default Map;
