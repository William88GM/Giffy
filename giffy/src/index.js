import React from "react";
import ReactDOM from "react-dom/client";
import "./Estilos/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import HistorialContextProvider from "./Servicios/historialContext";
import { FavoritosContextProvider } from "./Servicios/favoritosContextProvider";
import { ContextProvider } from "./Servicios/Context";
import PageContextProvider from "./Servicios/pageContextProvider";
import { MenuContextProvider } from "./Servicios/MenuContext";
import { AuthContextProvider } from "./Servicios/authContex";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ContextProvider>
        <HistorialContextProvider>
          <FavoritosContextProvider>
            <PageContextProvider>
              <MenuContextProvider>
                <App />
              </MenuContextProvider>
            </PageContextProvider>
          </FavoritosContextProvider>
        </HistorialContextProvider>
        {/* <Footer /> */}
      </ContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
