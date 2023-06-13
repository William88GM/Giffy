import React from "react";

export function LoadingGif() {
    const gifs = [
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        {
            original:
                "https://media0.giphy.com/media/Y5hFJbdSUZolByAhyG/giphy.webp?cid=c2c5bb03gobgsrv6f0dwhqu35b43ty9kf001lno0aiz4m7ut&ep=v1_gifs_search&rid=giphy.webp&ct=g",
        },
        <img src="" alt="" />,
    ];
    const random = Math.floor(Math.random() * 10);

    return (
        <>
            <img
                className="gif-favorito"
                src={gifs[random].original}
                alt="Loading..."
            />
        </>
    );
}
