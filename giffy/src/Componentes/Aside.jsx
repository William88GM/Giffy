import React, { useContext, useEffect, useState } from "react";
import { useOfflineHistory } from "../hooks/useOfflineHistory";
import { Recientes } from "./Recientes";
import { Recomendados } from "./Recomendados";
import { authContext } from "../Servicios/authContex";
import axios from "axios";
import { historyUserContext } from "../Servicios/historyUserContext";

export default function Aside({ setMenuIsActive, menu }) {
  const { listOffline, deleteItem } = useOfflineHistory();
  const { sesion } = useContext(authContext);
  const baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3002"
      : "https://giffy-back.onrender.com";
  // const [listUser, setListUser] = useState([]);
  const { listUser, setListUser } = useContext(historyUserContext);
  function solicitarHistorial() {
    // fetch(/history).then((res)=>setListUser(res.data))
    axios
      .get(`${baseURL}/api/historial`, { withCredentials: true })
      .then((res) => {
        setListUser(res.data.history.reverse());
        console.log(res.data);
      });
  }

  function deleteItemUser(word) {
    console.log(word);
    axios
      .delete(`${baseURL}/api/historial`, {
        withCredentials: true,
        data: { historyElement: word },
      })
      .then((res) => {
        setListUser(res.data.history);
        console.log(res.data);
      });
  }

  useEffect(() => {
    if (sesion) solicitarHistorial();
  }, [sesion]);

  if (sesion) {
    if (sesion.emailConfirmed) {
      return (
        <Recientes
          setMenuIsActive={setMenuIsActive}
          list={listUser}
          deleteItem={deleteItemUser}
        />
      );
    } else {
      return (
        <h3 style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
          Confirma tu email para ver tu historial
        </h3>
      );
    }
  }

  return (
    <Recientes
      setMenuIsActive={setMenuIsActive}
      list={listOffline}
      deleteItem={deleteItem}
    />
  );
}
