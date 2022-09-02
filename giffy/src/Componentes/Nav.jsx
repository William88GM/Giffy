export default function Nav({ Search, Limit, Submit }) {
  return (
    <nav>
      <form onSubmit={Submit}>
        <input placeholder="Buscar gifs" onChange={Search} />
        <input placeholder="Cantidad" type="number" onChange={Limit} />
        <button>Buscar</button>
      </form>
    </nav>
  );
}
