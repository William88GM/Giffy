export function RegisterMenu({ setMenuToLogin }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="LoginMenu">
      <span>Hola, vamo a registrarno lokoooo</span>
      <form onSubmit={handleSubmit}>
        <label>
          User
          <input type="text" name="username" />
        </label>

        <label>
          Contraseña
          <input
            autoComplete="current-password"
            type="password"
            name="password"
          />
        </label>
        <button>Registrarse</button>
      </form>
      <small>¿Ya tienes una cuenta?</small>
      <button onClick={() => setMenuToLogin("Login")}>Login</button>
    </div>
  );
}
