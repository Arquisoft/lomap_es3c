import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MapFilter from "./MapFilter";

test("Comprobamos que el componente se renderiza correctamente", async () => {

    render(
        <Router>
            <MapFilter selectedCategories={[]} setSelectedCategories={()=>{}} friendsURL={[]} friendsNames={[]}></MapFilter>
        </Router>
    );

    let shopInput = document.getElementById("shop");

    if(shopInput){
        fireEvent.click(shopInput);
    }

});