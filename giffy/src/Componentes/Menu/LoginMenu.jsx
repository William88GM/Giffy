import { Link } from "react-router-dom";

export function LoginMenu({ setMenuToRegister, readLocalStorage }) {
    function handleSubmit() {
        //Cosas que verifican si esta todo ok...
        readLocalStorage(true); //test
    }

    return (
        <div className="LoginMenu">
            <span>¡Hola de nuevo!</span>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" name="email" />
                </label>

                <label>
                    Contraseña
                    <input
                        autoComplete="current-password"
                        type="password"
                        name="contrasena"
                    />
                </label>
                <button>Iniciar sesión</button>
            </form>
            <Link
                onClick={() => setMenuToRegister("Register")}
                to={"#Register"}
            >
                Registrarse
            </Link>
        </div>
    );
}
