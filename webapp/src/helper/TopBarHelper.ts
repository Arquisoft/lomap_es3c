import Swal from "sweetalert2";
import { addToKnowInPod, getFriendsNamesFromPod } from "../solid/podsFriends";
import { Session, logout } from "@inrupt/solid-client-authn-browser";
import { deleteSolicitude, deleteUser, getSolicitudes } from "../api/api";
import { NavigateFunction } from "react-router-dom";
import { getFile } from "@inrupt/solid-client";

export async function miCuentaHelper(handleCloseUserMenu:any,session:Session,navigate: NavigateFunction){
    //TODO funcionalidad relativa a la cuenta del usuario
    handleCloseUserMenu();

    const webId = session.info.webId;
    const arrayWebId = [webId];
    let name:any="error";
    try{
      name = await getFriendsNamesFromPod(arrayWebId);
    }catch(error){
    }
    

    Swal.fire({
      title: '<p style="color:black; margin-bottom:0.25em;">Mi cuenta</p>',
      html: `
            <label for="name">Nombre</label>
            <input id="name" class="swal2-input" value="${name}" style="width: 65%;" readonly>
            <br/>
            <label for="webId">Web ID</label>
            <input id="webId" class="swal2-input" value="${webId}" style="width: 65%;" readonly>
            `,
      showCancelButton: true,
      confirmButtonText: 'Desactivar cuenta',
      confirmButtonColor: 'rgba(25, 118, 210, 1)',
      cancelButtonText: 'Atrás',
      cancelButtonColor: 'rgba(255, 50, 50, 0.9)',
      showLoaderOnConfirm: false,
      width: '60%',
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed && webId) {
        Swal.fire('Cuenta desactivada', 'Podrá reactivarla la próxima vez que inicie sesión', 'success').then(() => {
          logout().then(() => {
            navigate(`/`);
            deleteUser(webId.split("/profile/")[0])
          });
        })
      }
    })
  }

export async function getSolicitudesHelper(session:Session){
    if (session.info.isLoggedIn) {
      const userWebId = session.info.webId?.split('/profile')[0];
      const userName = userWebId?.split('//')[1].split('.')[0];
      const provider = userWebId?.split('//')[1].split('.')[1];
      if (userName != null && provider != null) {
        getSolicitudes(userName, provider).then((solicitudes) => {
          if (solicitudes.length === 0) {
            Swal.fire({
              icon: 'info',
              title: 'No tienes solicitudes de amistad',
              confirmButtonColor: "rgba(25, 118, 210, 1)",
              showConfirmButton: true,
              confirmButtonText: 'Aceptar'
            });
          } else {
            const options = solicitudes.map((s) => {
              return `<option value="${s.senderName + "-" + s.senderProvider}">${s.senderName + " (" + s.senderProvider + ")"}</option>`;
            });

            Swal.fire({
              title: '<p style="color:black; margin-bottom:0em;">Solicitudes de amistad</p>',
              html: `
                  <select id="user" class="swal2-input">
                  ${options}
                  </select>
                  `,
              showDenyButton: true,
              denyButtonColor: "rgba(255, 50, 50, 0.9)",
              denyButtonText: 'Rechazar',
              showCancelButton: false,
              confirmButtonColor: "rgba(25, 118, 210, 1)",
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              const user = (Swal.getPopup()?.querySelector('#user') as HTMLInputElement).value;
              if (result.isConfirmed) {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario ' + user.split("-")[0] + ' aceptado',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  deleteSolicitude(userName, provider, user.split("-")[0], user.split("-")[1]);
                  addToKnowInPod(session, "https://" + user.split("-")[0] + "." + user.split("-")[1] + ".net/profile/card#me");
                });
              } else if (result.isDenied) {
                Swal.fire({
                  icon: 'error',
                  title: 'Usuario ' + user.split("-")[0] + ' rechazado',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  deleteSolicitude(userName, provider, user.split("-")[0], user.split("-")[1]);
                });
              }
            }).catch((error) =>{
            })
          }
        })
      };
    }
  }

export async function getBioFromPodHelper(session:Session){
  // Obtener la URL del archivo de biografía en la carpeta pública
  const bioFileUrl = `${session.info.webId?.split('/profile')[0]}/public/bio.txt`;

  try {
    // Obtener el contenido del archivo de biografía utilizando la función getFile
    const file = await getFile(bioFileUrl, { fetch: session.fetch });
    const content = await file.text();
    console.log(`La biografía recuperada del POD es: ${content}`);
    return content;
  } catch (e) {
    console.log(`No se ha encontrado un archivo de biografía en la URL: ${bioFileUrl}`);
    return "";
  }
}