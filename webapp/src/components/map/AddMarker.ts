import { Session } from "@inrupt/solid-client-authn-browser";
import { MarkerInfo } from "./Map";
import { addMarkerToPod, saveImageInPod } from "./markUtils/MarkUtils";

export interface AddMarkerInfo {
    marker: MarkerInfo;
    session: Session;
    selectedMap: any;
    markers: any;
    setMarkers: any;
    selectedPosition: [number, number];
}

function addMarker(props: AddMarkerInfo) {
    let fileArray = props.marker.images as File[];
    let fileArrayToPod: File[] = [];
    let stringArrayToPod: string[] = [];
    let fileName: string;
    let blob;
    let renamedFile;
    for (let i = 0; i < fileArray.length; i++) {
        fileName = props.selectedMap + "-" + props.marker.name + "-" + i;
        blob = fileArray[i].slice(0, fileArray[i].size, fileArray[i].type);
        renamedFile = new File([blob], fileName, { type: fileArray[i].type });
        fileArrayToPod.push(renamedFile);
        stringArrayToPod.push(fileName + "." + fileArray[i].type.split("image/")[1]);
    }
    props.marker.images = stringArrayToPod;
    props.marker.coords = [props.selectedPosition[0], props.selectedPosition[1]];
    addMarkerToPod(props.selectedMap, props.marker, props.session);
    for (let i = 0; i < fileArrayToPod.length; i++) {
        saveImageInPod(props.session, fileArrayToPod[i], stringArrayToPod[i]);
    }
    let aux = props.markers;
    aux.push(props.marker);
    props.setMarkers(aux);
}

export default addMarker;