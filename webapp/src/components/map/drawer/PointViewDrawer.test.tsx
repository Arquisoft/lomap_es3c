import { fireEvent, render } from "@testing-library/react";
import PointViewDrawer from "./PointViewDrawer";
import { MarkerInfo } from "../Map";
import { Session } from "@inrupt/solid-client-authn-browser";

const marker: MarkerInfo = {
  authorWebId: "https://israel11.inrupt.net",
  name: "Punto de prueba",
  description: "Descripcion",
  categoria: "shop",
  images: ["https://res.cloudinary.com/demo/image/upload/v1682613175/docs_uploading_example/descarga_2_uj6thp.png"],
  review: [{
    "@type": "Review",
    "author": {
      "@type": "Person",
      "identifier": "https://israel11.inrupt.net"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": 5
    },
    "datePublished": 1682868607069,
    "reviewBody": "Me gusta el sitio",
  }],
  coords: [2, 3]
}

jest.mock('../../../solid/MarkUtils', () => ({
  updateMarkerReview: (session: Session, marker: MarkerInfo, selectedMap: string) =>jest.fn(),
}));

jest.mock('../../../helper/PointViewDrawerHelper', () => ({
  fetchImages: (images:string[] | File[],fetchImage:any,setImageListItems:any) =>jest.fn(),
  onSubmitReviewHelper:(marker:any,session:Session,map:string,setState:any,toggleDrawer:any,review: any) =>jest.fn(),
  toggleDrawerHelper:(setState: any, toggleDrawer: any)=>jest.fn()
}));

test("Comprobamos que el drawer se renderiza correctamente", async () => {

  let opened=true;
  let session = new Session();
  session.info.webId="https://israel11.inrupt.net";
  session.info.isLoggedIn=true;

  const { getByText } = render(
    <PointViewDrawer session={session} opened={opened} toggleDrawer={() =>{}} marker={marker} map={"Mapa de prueba"}></PointViewDrawer>
  );

  //expect(getByText("Nombre: ", { selector: 'strong' })).toBeInTheDocument();
  expect(getByText("Categoria: Tienda", { selector: 'h3' })).toBeInTheDocument();
  expect(getByText("Coordenadas", { selector: 'h3' })).toBeInTheDocument();
  expect(getByText("Latitud: 2", { selector: 'li' })).toBeInTheDocument();
  expect(getByText("Longitud: 3", { selector: 'li' })).toBeInTheDocument();
  expect(getByText("https://israel11.inrupt.net", { selector: 'h4' })).toBeInTheDocument();
  expect(getByText("Me gusta el sitio", { selector: 'p' })).toBeInTheDocument();
  expect(getByText("Añadir Valoración")).toBeInTheDocument();
});

test("Comprobamos que la review se crea correctamente", async () => {

  let opened=true;
  let session = new Session();
  session.info.webId="https://israel11.inrupt.net";
  session.info.isLoggedIn=true;

  const { getByText } = render(
    <PointViewDrawer session={session as Session} opened={opened} toggleDrawer={() =>{}} marker={marker} map={"Mapa de prueba"}></PointViewDrawer>
  );
  let botonValoracion = getByText("Añadir Valoración");
  expect(botonValoracion).toBeInTheDocument();
  fireEvent.click(botonValoracion);

  let commentsTextArea = document.getElementById("comments");
  if(commentsTextArea){
    fireEvent.change(commentsTextArea, { target: { value: "comentario" } });
  }

  let botonConfirmar = getByText("Confirmar");
  fireEvent.click(botonConfirmar);
});

