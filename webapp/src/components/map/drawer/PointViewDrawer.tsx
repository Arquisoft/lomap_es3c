import { Fragment, useEffect, useState } from "react";
import { Box, Drawer, ImageList, ImageListItem } from "@mui/material";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";
import ReviewForm from "../formPlace/ReviewForm";
import ReviewVista from "../formPlace/ReviewVista";
import { getViewCategory } from "../formPlace/ComboBoxCategoria";
import { fetchImages, onSubmitReviewHelper, toggleDrawerHelper } from "../../../helper/PointViewDrawerHelper";

export interface PointViewDrawerInfo {
    session: Session;
    opened: boolean;
    setOpened:any;
    toggleDrawer: any;
    marker: MarkerInfo;
    map: string;
}

export default function PointViewDrawer(props: PointViewDrawerInfo) {

    let imageCount = 1;

    const [state, setState] = useState(props.opened);

    const [imageListItems, setImageListItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setState(props.opened);
        fetchImages(props.marker.images,fetchImage,setImageListItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.opened]);

    const fetchImage = async (img: string) => {
        const imagenElemento = document.createElement("img");
        let aux: any = JSON.stringify(img);
        aux = JSON.parse(aux);
        imagenElemento.src = aux.contentUrl;
        return (
            <ImageListItem key={imageCount++}>
                <img src={imagenElemento.src} alt={`Imagen ${imageCount++}`} style={{ width: '10.25em', height: '10.25em' }}/>
            </ImageListItem>
        );
    };

    const onSubmitReview = async (review: any) => {
        await onSubmitReviewHelper(props.marker,props.session,props.map,setState,toggleDrawer,review);
        props.setOpened(false);
    }

    //En funcion del booleano desplegamos u ocultamos el menu lateral
    const toggleDrawer = toggleDrawerHelper(setState,props.toggleDrawer);

    //Mostramos la vista con la informacion del punto
    const list = () => (
        <Box sx={{
            width: 450,
            backgroundColor: "white",
        }}
            role="presentation"
        >
            <h2 className='text-center' style={{marginTop: "0.5em"}}><strong>Nombre: </strong>{props.marker.name}</h2>
            <h3 className='text-center' style={{fontSize: "1.25em"}}>Categoria: {getViewCategory(props.marker.categoria)}</h3>
            <br/>
            <h3 style={{marginLeft: "1em"}}>Coordenadas</h3>
            <ul style={{marginLeft: "1.5em"}}>
                <li>Latitud: {props.marker.coords[0]}</li>
                <li>Longitud: {props.marker.coords[1]}</li>
            </ul>
            <ImageList
                sx={{ width: 400, height: 300, marginLeft: "1em", paddingTop: "1em" }}
                cols={3}
                rowHeight={130}
            >
                {imageListItems}
            </ImageList>
            <ReviewForm reviews={props.marker.review} handleSubmit={onSubmitReview} session={props.session}></ReviewForm>
            <br/>
            <ReviewVista reviews={props.marker.review}></ReviewVista>
        </Box>
    );

    //Devolvemos el menú con la vista del punto
    return (
        <div>
            <Fragment key={'left'}>
                <Drawer
                    anchor={'left'}
                    open={state}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </Fragment>
        </div>
    );
}