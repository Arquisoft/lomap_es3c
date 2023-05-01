import { Session } from "@inrupt/solid-client-authn-browser";
import FriendsList from "./FriendsList";
import { fireEvent, render, waitFor } from "@testing-library/react";

window.scrollTo = jest.fn();

jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
      session: {
        info: {
          isLoggedIn: true,
        },
      },
    }),
  }));

  jest.mock("../../solid/MarkUtils", () => ({
    getMapsFriendFromPod: (session: Session, friendUrl: string) => (Promise.resolve(["mapa1","mapa2"])),
  }));

describe('FriendsList', () => {
    test("Comprobamos que el componente se renderiza correctamente", async () => {
        renderAndCheck();
    });

    test("Cargamos los mapas de un amigo", async () => {
        let getByText =renderAndCheck();
        let span = getByText("israel", { selector: 'span' });
        fireEvent.click(span);
        await waitFor(() => expect(getByText('Cargando mapas...')).toBeInTheDocument());
        await waitFor(() => expect(getByText('Selecciona un mapa')).toBeInTheDocument());

        const selectMapas = document.querySelector("select");

        if(selectMapas){
            fireEvent.change(selectMapas, { target: { value: "mapa1" } });
        }

        let option = getByText("mapa1", { selector: 'option' });
        fireEvent.click(option);

        let button = getByText("Visualizar", { selector: 'button' });
        fireEvent.click(button);
    });

});




function renderAndCheck(){
    const session = new Session;
        const { getByText } = render(
            <FriendsList children={[]} friendsNames={['israel']} session={session} markers={[]} setMarkers={()=>{}} selectedMap={"mapa"} setSelectedMap={()=>{}} sites={[]} setSites={()=>{}} setEditable={()=>{}} friendsURL={["https://israel11.inrupt.net/profile/card#me"]} mySelectedMap={0} setMySelectedMap={()=>{}}></FriendsList>

        );

    expect(getByText("israel", { selector: 'span' })).toBeInTheDocument();

    return getByText
}