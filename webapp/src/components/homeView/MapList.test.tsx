import { fireEvent, render } from "@testing-library/react";
import MapsList from "./MapsList";
import { Session } from "@inrupt/solid-client-authn-browser";

jest.mock("@inrupt/solid-ui-react", () => ({
    useSession: () => ({
      session: {
        info: {
          isLoggedIn: true,
        },
      },
    }),
  }));

jest.mock('../../helper/MapListHelper', () => ({
    loadSitesHelper: (session: Session) => jest.fn(),
    clickMapHelper:(map: string,setEditable:any,session:Session,setMarkers:any,setSelectedMap:any,setMySelectedMap:any,sites:any)=>jest.fn()
  }));

test("Comprobamos que el componente se renderiza correctamente", async () => {
    
    const { getByText } = render(
        <MapsList session={new Session} markers={[]} setMarkers={()=>{}} selectedMap={undefined} setSelectedMap={()=>{}} sites={["mapa1"]} setSites={()=>{}} setEditable={()=>{}} friendsURL={[]} friendsNames={[]} mySelectedMap={0} setMySelectedMap={()=>{}}></MapsList>
    );

    let button = getByText("mapa1", { selector: 'span' });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    
});