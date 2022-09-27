import { Link } from "react-router-dom";
import logo from "../assets/logo_GF.svg";
export default function Nav({ Search, Submit }) {
  return (
    <nav>
      <Link to={"/"} className="logo">
        <img src={logo} alt="logo" />
        Giffy
      </Link>
      <form onSubmit={Submit}>
        <input placeholder="Buscar gifs" onChange={Search} />
        <button>Buscar</button>
      </form>
    </nav>
  );
}
