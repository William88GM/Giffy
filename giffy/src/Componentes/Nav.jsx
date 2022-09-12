export default function Nav({ Search, Submit }) {
  return (
    <nav>
      <form onSubmit={Submit}>
        <img src="../assets/logo.png" alt="logo" />
        <input placeholder="Buscar gifs" onChange={Search} />
        <button>Buscar</button>
      </form>
    </nav>
  );
}
