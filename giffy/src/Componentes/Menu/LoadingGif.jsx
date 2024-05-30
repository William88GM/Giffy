import React from "react";

export function LoadingGif() {
  const gifs = [
    {
      original:
        "https://media1.giphy.com/media/xTkcEQACH24SMPxIQg/giphy-preview.webp?cid=c2c5bb03v6hoh5e4wbb5whp1dz40yphwbdx3mjpwdvs7r6a4&ep=v1_gifs_search&rid=giphy-preview.webp&ct=g",
      id_giffy: "xTkcEQACH24SMPxIQg", //ok
    },
    {
      original:
        "https://media3.giphy.com/media/3y0oCOkdKKRi0/giphy-preview.webp?cid=c2c5bb03n7dezo6cyyyhw8sz6gh2e00fuoofwqcmel46lyu5&ep=v1_gifs_search&rid=giphy-preview.webp&ct=g",
      id_giffy: "3y0oCOkdKKRi0", //ok
    },
    {
      original:
        "https://media4.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.webp?cid=c2c5bb036275c1aab11ad0e23167bb01e2c5c67f6f86e217&ep=v1_gifs_gifId&rid=giphy.webp&ct=g",
      id_giffy: "ZBQhoZC0nqknSviPqT", //ok
    },
    {
      original:
        "https://media2.giphy.com/media/WiIuC6fAOoXD2/giphy.webp?cid=c2c5bb034d80b2348a8aec19c1689d5c4c36974e670f901b&ep=v1_gifs_gifId&rid=giphy.webp&ct=g",
      id_giffy: "WiIuC6fAOoXD2", //ok
    },
    {
      original:
        "https://media4.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.webp?cid=c2c5bb03uocq9jqbjbj55fxfel79tg31xt2d4oeb6q69d7gl&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      id_giffy: "270TRfaKb7axy", //ok
    },
    {
      original:
        "https://media1.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.webp?cid=c2c5bb03ny06nfi29kxeb62ib2ln056p44byzp1xi6xhgvji&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      id_giffy: "kUTME7ABmhYg5J3psM", //ok
    },
    {
      original:
        "https://media1.giphy.com/media/z9c1ZCvaH5WBq/giphy.webp?cid=c2c5bb03chs0i03du8cfuysw51wwh577pyteutdvqaps9d8s&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      id_giffy: "z9c1ZCvaH5WBq",
    },
    {
      original:
        "https://media0.giphy.com/media/VseXvvxwowwCc/giphy.webp?cid=c2c5bb03lp99vlxi3clys0czasj0puza72npxhiurff8qqg4&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      id_giffy: "z9c1ZCvaH5WBq",
    },
    {
      original:
        "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
      id_giffy: "z9c1ZCvaH5WBq",
    },
  ];
  const random = Math.floor(Math.random() * 10);

  return (
    <div style={{"direction":"ltr"}}>
      <img
        className="gif-favorito"
        src={gifs[random].original||gifs[0]}
        alt="Loading..."
      />
      <h3>Cargando</h3>
      <br />
      {/* <small>Esperando a que el servidor (gratuito) despierte</small> */}
      {navigator.userAgent.toLowerCase().indexOf("firefox")>-1?<>
      <small >Si usas Firefox, desabilita la proteccion de rastreo aumentada para poder usar los servicios de Google</small>
  <br />
      <small >(En el icono de escudo al lado de la URL)</small>
      </>
      :""}
    </div>
  );
}
