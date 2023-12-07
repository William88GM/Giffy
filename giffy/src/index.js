import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./Estilos/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import OfflineHistorialContextProvider from "./Servicios/offlineHistorialContext";
import { FavoritosContextProvider } from "./Servicios/favoritosContextProvider";
import { ContextProvider } from "./Servicios/Context";
import PageContextProvider from "./Servicios/pageContextProvider";
import { MenuContextProvider } from "./Servicios/MenuContext";
import { AuthContextProvider } from "./Servicios/authContex";
import { HistoryUserContextProvider } from "./Servicios/historyUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <HistoryUserContextProvider>
        <AuthContextProvider>
          <ContextProvider>
            <OfflineHistorialContextProvider>
              <FavoritosContextProvider>
                <PageContextProvider>
                  <MenuContextProvider>
                    <App />
                  </MenuContextProvider>
                </PageContextProvider>
              </FavoritosContextProvider>
            </OfflineHistorialContextProvider>
            {/* <Footer /> */}
          </ContextProvider>
        </AuthContextProvider>
      </HistoryUserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
