import { Session } from "@inrupt/solid-client-authn-browser";
import { LatLng } from "leaflet";
import createMapWindow from "./CreateMap";

export function mapOnClickHelper(e: LatLng,session:Session,editable?:boolean,selectedMap?:string,setSelectedPosition?:any,setIsCreateDrawerSelected?:any){
    if(!(editable === undefined || editable === false)) {
        if (selectedMap === undefined) {
            createMapWindow(session);
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