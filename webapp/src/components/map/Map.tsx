import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L, { Icon } from 'leaflet';
import MapDrawer from './drawer/MapDrawer';
import AddPlaceDrawer from './drawer/MapDrawer';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {
    createSolidDataset,
    getPodUrlAll,
    saveFileInContainer,
    getThingAll,
    removeThing,
    SolidDataset
} from "@inrupt/solid-client";
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { useSession } from "@inrupt/solid-ui-react";
import { createGeoJSONPoint } from './markUtils/MarkUtils';


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

    async function addMarkerToPod(marker: MarkerInfo) {
        var markerFile = new File([createGeoJSONPoint(marker)], "filename.geojson", { type: "application/geo+json" });

        // Guardar los cambios en el pod
        let savedReadingList = await saveFileInContainer(
            "https://israel11.inrupt.net/public",
            markerFile,
            { slug: markerFile.name, contentType: markerFile.type, fetch: session.fetch }
        );
        alert(savedReadingList);
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
        addMarkerToPod(marker);
    }

    const Markers = () => {
        /*
        const allThings = getThingAll(myReadingList);

        return (<div>
            {allThings.map((position, idx) =>
            <Marker key={`marker-${idx}`} position={[0, 0]} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                <Popup>
                    <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                </Popup>
            </Marker>
            )}
        </div>);
        */
        return (
            <div>
                {markers.map((position, idx) =>
                    <Marker key={`marker-${idx}`} position={position.coords} icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                )}
            </div>
        )

    }

    const Drawer = () => {

        const map = useMapEvents({
            click(e: { latlng: { lat: number; lng: number; }; }) {
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
                //Cuando hacemos click en el mapa indicamos que est?? seleccionado para desplegar el menu lateral
                setIsSelected(true);
            },
        })

        //Retornamos el men?? lateral si hay una posici??n seleccionada
        return (
            selectedPosition ?
                <div>
                    <AddPlaceDrawer opened={isSelected} onSubmit={addMarker}></AddPlaceDrawer>
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
            <Markers></Markers>
            <Drawer />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    );


}
export default Map;
