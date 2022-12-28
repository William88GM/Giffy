import "./Estilos/App.css";
import { Routes, Route } from "react-router-dom";

import Nav from "./Componentes/Nav";
import Aside from "./Componentes/Aside";
import { ContextProvider } from "./Servicios/Context";
import Gif from "./Componentes/Gif";
import { Page404 } from "./Componentes/Page404";
import Trending from "./Componentes/Trending";
import SearchResults from "./Componentes/SearchResults";
import HistorialContextProvider from "./Servicios/historialContext";
import Footer from "./Componentes/Footer";
function App() {
	return (
		<ContextProvider>
			<HistorialContextProvider>
				<Nav />
				<main>
					<article>
						<Routes>
							<Route path="/" element={<Trending />} />
							<Route path={`/:search`} element={<SearchResults />} />

							<Route path="/:search/:id" element={<Gif />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</article>
				</main>

				<Aside />
			</HistorialContextProvider>
			<Footer />
		</ContextProvider>
	);
}

export default App;
