import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import L, { Icon } from 'leaflet';
import MapDrawer from './drawer/MapDrawer';
import AddPlaceDrawer from './drawer/MapDrawer';
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {
    addUrl,
    addInteger,
    addStringNoLocale,
    createSolidDataset,
    createThing,
    getPodUrlAll,
    getSolidDataset,
    getThingAll,
    getStringNoLocale,
    removeThing,
    saveSolidDatasetAt,
    setThing,
    SolidDataset
} from "@inrupt/solid-client";


export interface MarkerInfo {
    name: string;
    comments: string;
    score: number;
    categoria: string;
    coords: [number, number];
}


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
        // Attempt to retrieve the reading list in case it already exists.
        myReadingList = await getSolidDataset("https://storage.inrupt.com/c19e5e92-842f-44de-a1c2-4ee6b4b5bc77/", { fetch: fetch });
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
    const newThing = createThing({ name: marker.name });

    // Añadir propiedades al objeto Thing
    addStringNoLocale(newThing, "https://schema.org/name", marker.name);
    addStringNoLocale(newThing, "https://schema.org/comments", marker.comments);
    addInteger(newThing, "https://schema.org/score", marker.score);
    addStringNoLocale(newThing, "https://schema.org/categoria", marker.categoria);

    // Añadir el objeto Thing al SolidDataset

    const updatedDataset = setThing(myReadingList, newThing);

    // Guardar los cambios en el pod
    await saveSolidDatasetAt("https://storage.inrupt.com/c19e5e92-842f-44de-a1c2-4ee6b4b5bc77/", updatedDataset);
}

function Map() {

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