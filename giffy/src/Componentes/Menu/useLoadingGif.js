export function useLoadingGif() {
    //Alternativa a un Componente, se usaría en un fetch al principio, en lugar de en un return
    const gifs = [
        {
            original:
                "https://media1.giphy.com/media/xTkcEQACH24SMPxIQg/giphy-preview.webp?cid=c2c5bb03v6hoh5e4wbb5whp1dz40yphwbdx3mjpwdvs7r6a4&ep=v1_gifs_search&rid=giphy-preview.webp&ct=g",
            id_giffy: "xTkcEQACH24SMPxIQg",
        },
        {
            original:
                "https://media3.giphy.com/media/3y0oCOkdKKRi0/giphy-preview.webp?cid=c2c5bb03n7dezo6cyyyhw8sz6gh2e00fuoofwqcmel46lyu5&ep=v1_gifs_search&rid=giphy-preview.webp&ct=g",
            id_giffy: "3y0oCOkdKKRi0",
        },
        {
            original:
                "https://media4.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.webp?cid=c2c5bb036275c1aab11ad0e23167bb01e2c5c67f6f86e217&ep=v1_gifs_gifId&rid=giphy.webp&ct=g",
            id_giffy: "ZBQhoZC0nqknSviPqT",
        },
        {
            original:
                "https://media2.giphy.com/media/WiIuC6fAOoXD2/giphy.webp?cid=c2c5bb034d80b2348a8aec19c1689d5c4c36974e670f901b&ep=v1_gifs_gifId&rid=giphy.webp&ct=g",
            id_giffy: "WiIuC6fAOoXD2",
        },
        {
            original:
                "https://media4.giphy.com/media/270TRfaKb7axy/giphy.webp?cid=c2c5bb03rrmv5z9jku9iht64lfnomdpzvp6i98go4oqn6kxg&ep=v1_gifs_search&rid=giphy.webp&ct=g",
            id_giffy: "270TRfaKb7axy",
        },
        {
            original:
                "https://media1.giphy.com/media/kUTME7ABmhYg5J3psM/giphy.webp?cid=c2c5bb03ny06nfi29kxeb62ib2ln056p44byzp1xi6xhgvji&ep=v1_gifs_search&rid=giphy.webp&ct=g",
            id_giffy: "kUTME7ABmhYg5J3psM",
        },
        {
            original:
                "https://media1.giphy.com/media/z9c1ZCvaH5WBq/giphy.webp?cid=c2c5bb03chs0i03du8cfuysw51wwh577pyteutdvqaps9d8s&ep=v1_gifs_search&rid=giphy.webp&ct=g",
            id_giffy: "z9c1ZCvaH5WBq",
        },
    ];
    const random = Math.floor(Math.random() * 10);

    return [gifs[random]];
}
