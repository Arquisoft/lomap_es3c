import { fireEvent, render } from "@testing-library/react";
import InitTopBar from "./InitTopBar";

test("Comprobamos que el componente se renderiza correctamente y los respectivos enlaces", async () => {

    const { getByText } =render(
        <InitTopBar setIndex={()=>{}}></InitTopBar>
    );

    getSpanAndClick(getByText,"Identifícate");
    getSpanAndClick(getByText,"¿Qué es?");
    getSpanAndClick(getByText,"Sobre nosotros");
});

function getSpanAndClick(getByText:any,spanTag:string){
    let strongIdent=getByText(spanTag, { selector: 'strong' });
    let buttonIdent = strongIdent.parentElement;
    let span = buttonIdent?.querySelector("span");
    if(span){
        fireEvent.click(span);
    }
}