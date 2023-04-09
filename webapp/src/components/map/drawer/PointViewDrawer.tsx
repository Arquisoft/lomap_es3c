import { Fragment, useEffect, useState } from "react";
import { Box, Drawer, ImageList, ImageListItem } from "@mui/material";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";
import { getImageFromPod } from "../markUtils/MarkUtils";

export interface PointViewDrawerInfo {
    session: Session;
    opened: boolean;
    toggleDrawer: any;
    marker: MarkerInfo;
}

export default function PointViewDrawer(props: PointViewDrawerInfo) {

    const [state, setState] = useState(props.opened);

    const [imageListItems, setImageListItems] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
          const items: JSX.Element[] = [];
          for (const img of props.marker.images) {
            const imageListItem = await fetchImage(img as string);
            items.push(imageListItem);
          }
          setImageListItems(items);
        };
        fetchImages();
      }, [state]);
  
      useEffect(() => {
          setState(props.opened);
      }, [props.opened]);

    const fetchImage = async (img: string) => {
      const imagenElemento = document.createElement("img");
      const imgContent = await getImageFromPod(props.session, img);
      imagenElemento.src = URL.createObjectURL(imgContent);
      return (
        <ImageListItem key={img as string}>
          <img src={imagenElemento.src} alt={`Imagen ${img}`} style={{ width: '10.25em', height: '10.25em' }}
           />
        </ImageListItem>
      );
    };
  
    //En funcion del booleano desplegamos u ocultamos el menu lateral
    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
                props.toggleDrawer(open);
            };

    //Mostramos la vista con la informacion del punto
    const list = () => (
        <Box sx={{
            width: 450
        }}
            role="presentation"
        >
            <h2>Nombre: {props.marker.name}</h2>
            <h3>Categoria: {props.marker.categoria}</h3>
            <h3>Coordenadas</h3>
            <ul>
                <li>Latitud: {props.marker.coords[0]}</li>
                <li>Longitud: {props.marker.coords[1]}</li>
            </ul>
            <ImageList
                sx={{ width: 400, height: 300 }}
                cols={3}
                rowHeight={130}
            >
                {imageListItems}
            </ImageList>
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