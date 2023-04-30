import { Session } from "@inrupt/solid-client-authn-browser";
import { MarkerInfo } from "./Map";
import { addMarkerToPod } from "../../solid/MarkUtils";

export interface AddMarkerInfo {
    marker: MarkerInfo;
    session: Session;
    selectedMap: any;
    markers: any;
    setMarkers: any;
    selectedPosition: [number, number];
}

async function addMarker(props: AddMarkerInfo) {
    const fileArray = props.marker.images as File[];
    const fileUrls: string[] = [];

    const formData = new FormData();
    for (const element of fileArray) {
        formData.append("file", element);
        formData.append("upload_preset", "docs_upload_example_us_preset");
        await fetch('https://api.cloudinary.com/v1_1/demo/image/upload',
            {
                mode: 'cors',
                method: "POST",
                body: formData
            })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                fileUrls.push(JSON.parse(data)["url"]);
            });
    }

    // Actualizar la información de la marca con las URLs de las imágenes
    const aux = props.markers;
    props.marker.images = fileUrls;
    props.marker.coords = [props.selectedPosition[0], props.selectedPosition[1]];
    props.marker.authorWebId = (props.session.info.webId?.split('/profile')[0] || 'error')
    addMarkerToPod(props.selectedMap, props.marker, props.session);
    aux.push(props.marker);
    props.setMarkers(aux);
}

export default addMarker;