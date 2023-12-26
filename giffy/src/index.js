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
import { NoHayMasContextProvider } from "./Servicios/NoHayMasContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <HistoryUserContextProvider>
        <AuthContextProvider>
          <NoHayMasContextProvider>
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
          </NoHayMasContextProvider>
        </AuthContextProvider>
      </HistoryUserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
