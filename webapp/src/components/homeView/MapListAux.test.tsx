import { render } from "@testing-library/react";
import MapListAux from "./MapListAux";
import { Session } from "@inrupt/solid-client-authn-browser";

test("Comprobamos que el componente se renderiza correctamente cuando tiene que estar abierto", async () => {
    render(
        <MapListAux open={true} session={{} as Session} markers={[]} setMarkers={() => { } } selectedMap={[]}
        setSelectedMap={() => { } } sites={[]} setSites={() => { } } editable={false}
        setEditable={() => { } } friendsURL={[]} friendsNames={[]} mySelectedMap={0}
        setMySelectedMap={() => { } } children={[]}></MapListAux>
    );
});

test("Comprobamos que el componente se renderiza correctamente cuando tiene que estar cerrado", async () => {
    render(
        <MapListAux open={true} session={{} as Session} markers={[]} setMarkers={() => { } } selectedMap={[]}
        setSelectedMap={() => { } } sites={[]} setSites={() => { } } editable={false}
        setEditable={() => { } } friendsURL={[]} friendsNames={[]} mySelectedMap={0}
        setMySelectedMap={() => { } } children={[]}></MapListAux>
    );
});