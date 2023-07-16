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
import { FavoritosContextProvider } from "./Servicios/favoritosContextProvider";
import PageContextProvider from "./Servicios/pageContextProvider";

function App() {
    //El bug es al entrar a un gif, luego salir y luego cargar mas gifs, ahi empieza a cargar repetidos
    return (
        <ContextProvider>
            <HistorialContextProvider>
                <FavoritosContextProvider>
                    <PageContextProvider>
                        <Nav />
                        <main>
                            <article>
                                <Routes>
                                    <Route path="/" element={<Trending />} />
                                    <Route
                                        path={`/:search`}
                                        element={<SearchResults />}
                                    />

                                    <Route
                                        path="/:search/:id"
                                        element={<Gif />}
                                    />
                                    <Route
                                        path="/favorites/:id"
                                        element={<Gif />}
                                    />
                                    <Route path="*" element={<Page404 />} />
                                </Routes>
                            </article>
                        </main>

                        <Aside />
                    </PageContextProvider>
                </FavoritosContextProvider>
            </HistorialContextProvider>
            <Footer />
        </ContextProvider>
    );
}

export default App;
