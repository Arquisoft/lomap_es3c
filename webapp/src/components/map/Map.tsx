import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { LatLng } from 'leaflet';
import PlaceDrawer from './drawer/PointCreateDrawer';
import {Session } from '@inrupt/solid-client-authn-browser';
import MapEventHandler from './MapEventHandler';
import { Markers } from './Markers';
import createMapWindow from '../homeView/CreateMap';
import PointViewDrawer from './drawer/PointViewDrawer';
import addMarker, { AddMarkerInfo } from './AddMarker';

export interface MarkerInfo {
    authorWebId:string;
    name: string;
    description:string;
    categoria: string;
    images:File[] | string[];
    review:any;
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
    friendsURL:string[];
    friendsNames:string[];
    mySelectedMap:number;
    setMySelectedMap:any;
}

function Map(props: MapInfo) {

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [selectedMarker, setSelectedMarker] = useState<MarkerInfo>({
        authorWebId:"",
        name: "",
        description:"",
        categoria: "",
        review:[],
        images:[],
        coords: [0, 0]
    });

    const [isCreateDrawerSelected, setIsCreateDrawerSelected] = useState(false);

    const [isViewPointDrawerSelected, setIsViewPointDrawerSelected] = useState(false);

    const onSubmitAddMarker = (marker: MarkerInfo) => {
        addMarker({
            marker: marker,
            session: props.session,
            selectedMap: props.selectedMap,
            markers: props.markers,
            setMarkers: props.setMarkers,
            selectedPosition: selectedPosition
        });
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
                setIsCreateDrawerSelected(true);
            }
        }
    }

    const nuevoMapa = () => {
        createMapWindow(props.session);
    };

    const toggleCreateDrawer = (isCreateDrawerSelected: boolean) => {
        setIsCreateDrawerSelected(isCreateDrawerSelected);
    }

    const toggleViewPointDrawer = (isViewPointDrawerSelected: boolean) => {
        setIsViewPointDrawerSelected(isViewPointDrawerSelected);
    }

    return (
        <MapContainer
            className="map"
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
        >
            <MapEventHandler onClick={mapOnClick} />
            <Markers session={props.session} marker={props.markers} selectedCategories={props.selectedCategories} setSelectedCategories={props.setSelectedCategories} setIsViewPointDrawerSelected={setIsViewPointDrawerSelected} setSelectedMarker={setSelectedMarker}></Markers>
            <PointViewDrawer session={props.session} opened={isViewPointDrawerSelected} toggleDrawer={toggleViewPointDrawer} marker={selectedMarker} map={props.selectedMap}></PointViewDrawer>
            <PlaceDrawer opened={isCreateDrawerSelected} onSubmit={onSubmitAddMarker} toggleDrawer={toggleCreateDrawer}></PlaceDrawer>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer >
    );
}
export default Map;
