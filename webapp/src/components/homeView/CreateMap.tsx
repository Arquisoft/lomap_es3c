import { Session } from "@inrupt/solid-client-authn-browser";
import Swal from "sweetalert2";
import { createMap } from "../map/markUtils/MarkUtils";

function createMapWindow(session:Session){
    Swal.fire({
        title: '<p style="color: black;">Introduzca el nombre del mapa</p>',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonColor: "rgba(255, 50, 50, 0.9)",
        confirmButtonText: 'Crear',
        confirmButtonColor: "rgba(25, 118, 210, 1)",
        showLoaderOnConfirm: true,
        preConfirm:async (mapName) => {
            if (mapName === "") {
              Swal.showValidationMessage(
                `ERROR: Nombre de mapa vacío`
              )
            } else {
              // AÑADIR EL MAPA
              let result =await createMap(session,mapName);
              if(!result){
                Swal.fire({
                  icon: 'error',
                  text: 'El nombre del mapa ya existe',
                  showConfirmButton: true
                })
              }else{
                Swal.fire({
                  icon: 'success',
                  text: 'Mapa "' + mapName + '" creado',
                  showConfirmButton: false,
                  timer: 2000
                })
              }
              
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
}

export default createMapWindow;