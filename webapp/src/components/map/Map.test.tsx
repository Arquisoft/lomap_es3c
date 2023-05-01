import { render } from "@testing-library/react";
import MapView from "./Map";
import { Session } from "@inrupt/solid-client-authn-browser";

test("Comprobamos que el componente se renderiza correctamente", async () => {

    render(
        <MapView session={{}as Session} markers={[]} setMarkers={undefined} selectedMap={undefined} setSelectedMap={undefined} sites={[]} setSites={undefined} setEditable={undefined} friendsURL={[]} friendsNames={[]} mySelectedMap={0} setMySelectedMap={undefined}></MapView>
    );
});