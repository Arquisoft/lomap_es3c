import { render } from "@testing-library/react";
import TopBar from "./TopBar";


const friendsURL = ["https://israel11.inrupt.net/profile/card#me"];
const friendsNames =["israel11"];
test("Comprobamos que el componente se renderiza correctamente", async () => {

    const { getByText } = render(
        <TopBar selectedCategories={[]} setSelectedCategories={()=>{}} friendsURL={friendsURL} friendsNames={friendsNames}/>
      );
    expect(getByText("CATEGORIAS")).toBeInTheDocument();
});