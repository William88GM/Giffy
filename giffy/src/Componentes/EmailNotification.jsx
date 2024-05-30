import { useContext } from "react";
import { authContext } from "../Servicios/authContex";

export function EmailNotification() {
  const { sesion } = useContext(authContext);
  // function reenviarEmail(){
  //   if(sesion.emailConfirmed === false){

  //   }
  // }
  if (sesion) {
    const emailName = sesion.username.split("@")[1].split(".")[0];
    const emailAdress = `https://${emailName}.com`;

    return (
      <>
        {sesion.emailConfirmed === false ? (
          <div className="EmailNotification">
            <h6>Confirme su correo electrónico</h6>
            <a href={emailAdress} rel="noreferrer">
              Ir a {emailName.toUpperCase()}
            </a>
            {/* <button onClick={}>Reenviar Email</button> */}
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
