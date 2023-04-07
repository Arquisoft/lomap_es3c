import { Session } from "@inrupt/solid-client-authn-browser";
import Swal from "sweetalert2";
import { createMap } from "../map/markUtils/MarkUtils";

function createMapWindow(session:Session){
    Swal.fire({
        title: 'Introduzca el nombre del mapa',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Crear',
        showLoaderOnConfirm: true,
        preConfirm:async (mapName) => {
            if (mapName === "") {
              Swal.showValidationMessage(
                `ERROR: Nombre de mapa vacío`
              )
            } else {
              // AÑADIR EL MAPA
              await createMap(session,mapName);
              Swal.fire({
                icon: 'success',
                text: 'Mapa "' + mapName + '" creado',
                showConfirmButton: false,
                timer: 2000
              })
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
}

export default createMapWindow;