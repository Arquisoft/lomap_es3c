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


export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}

function Map() {
    const session = useSession();
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

    async function crearMarcadores() {

        try {
            myReadingList = createSolidDataset();

            const mypods = await getPodUrlAll("https://israel11.inrupt.net/", { fetch: fetch });
            // Attempt to retrieve the reading list in case it already exists.
            // Clear the list to override the whole list
            const items = getThingAll(myReadingList);
            items.forEach((item) => {
                myReadingList = removeThing(myReadingList, item);
            });
        } catch (error: any) {
            if (typeof error.statusCode === "number" && error.statusCode === 404) {
                // if not found, create a new SolidDataset (i.e., the reading list)
                myReadingList = createSolidDataset();
            } else {
                console.error(error.message);
            }
        }
        return myReadingList;
    }

    async function addMarkerr(marker: MarkerInfo) {
        myReadingList = await crearMarcadores();
        // Añadir el objeto Thing al SolidDataset

        var json = new File([""], "filename.json", { type: "application/json" });

        // Guardar los cambios en el pod
        let savedReadingList = await saveFileInContainer(
            "https://israel11.inrupt.net/public",
            json,
            { slug: json.name, contentType: json.type, fetch: session.fetch }
        );
        alert(savedReadingList);
    }

    handleRedirectAfterLogin();

    /*
    Funcion que procesa la informacion de inicio de sesion 
    */
    async function handleRedirectAfterLogin() {
        await handleIncomingRedirect(); //Obtiene la informacion de identificacion aportada por el identity provider
        const session = getDefaultSession();
        if (session.info.isLoggedIn) {
            //alert("Logeado con exito: " + session.info.webId);
        }
    }



    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    const [isSelected, setIsSelected] = useState(false);

    const [markers, setMarkers] = useState<MarkerInfo[]>([]);

    const addMarker = (marker: MarkerInfo) => {
        marker.coords = [selectedPosition[0], selectedPosition[1]];
        setMarkers([...markers, marker]);
        addMarkerr(marker);
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
                //Cuando hacemos click en el mapa indicamos que está seleccionado para desplegar el menu lateral
                setIsSelected(true);
            },
        })

        //Retornamos el menú lateral si hay una posición seleccionada
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
