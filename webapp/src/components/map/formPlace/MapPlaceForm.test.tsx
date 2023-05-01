import { fireEvent, render } from "@testing-library/react";
import MapPlaceForm from "./MapPlaceForm";

test("Comprobamos que el componente se renderiza correctamente y creamos el punto", async () => {

    const {getByText} = render(
        <MapPlaceForm action={()=>{}} isReadOnly={false} ></MapPlaceForm>
    );

    let buttonAdd = getByText("Añadir lugar", { selector: 'button' });
    expect(buttonAdd).toBeInTheDocument();
    fireEvent.click(buttonAdd);
});