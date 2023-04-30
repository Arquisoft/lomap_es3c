import { render } from "@testing-library/react";
import MapsList from "./MapsList";
import { Session } from "@inrupt/solid-client-authn-browser";

jest.mock('../../solid/MarkUtils', () => ({
    getMapsFromPod: (session: Session) => { return Promise.resolve(["mapa1","mapa2","mapa3"]); },
  }));

test("Comprobamos que el componente se renderiza correctamente", async () => {
    
    const { getByText } = render(
        <MapsList session={new Session} markers={[]} setMarkers={()=>{}} selectedMap={undefined} setSelectedMap={()=>{}} sites={["mapa1"]} setSites={()=>{}} setEditable={()=>{}} friendsURL={[]} friendsNames={[]} mySelectedMap={0} setMySelectedMap={()=>{}}></MapsList>
    );

    expect(getByText("mapa1", { selector: 'span' })).toBeInTheDocument();

    
});