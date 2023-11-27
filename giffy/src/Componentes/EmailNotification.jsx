import { useContext } from "react";
import { authContext } from "../Servicios/authContex";

export function EmailNotification() {
  const { sesion } = useContext(authContext);
  if (sesion) {
    const emailName = sesion.username.split("@")[1].split(".")[0];
    const emailAdress = `https://${emailName}.com`;

    return (
      <>
        {sesion.emailConfirmed === false ? (
          <div className="EmailNotification">
            <h6>Confirme su correo electrónico</h6>
            <a href={emailAdress} target="_blank" rel="noreferrer">
              Ir a {emailName.toUpperCase()}
            </a>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }
}
