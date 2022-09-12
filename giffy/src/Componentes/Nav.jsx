import logo from "../../assets/logo.png";
export default function Nav({ Search, Submit }) {
  return (
    <nav>
      <form onSubmit={Submit}>
        <img src={logo} alt="logo" />
        <input placeholder="Buscar gifs" onChange={Search} />
        <button>Buscar</button>
      </form>
    </nav>
  );
}
