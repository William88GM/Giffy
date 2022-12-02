import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import arrow from "../assets/arrow.jpg";

export default function Gif() {
	const { id } = useParams();
	const { gifs } = useContext(Context);
	const navigate = useNavigate();
	const [gif, setGif] = useState({});

	useEffect(() => {
		window.scroll(0, 0);
		setGif(gifs.find((elem) => elem.id === id));
	}, [gifs, id]);

	if (!gif) {
		fetch(
			`https://api.giphy.com/v1/gifs/${id}?api_key=W4lIh5l8sYAEb9cE9NnQACvmFei8NNwM`
		)
			.then((res) => res.json())
			.then((res) =>
				setGif({
					original: res.data.images.original.url,
					title: res.data.title,
				})
			);
	}
	console.log(gif);

	return (
		<>
			<div className="gif">
				{gif && (
					<>
						<img src={gif.original} alt={gif.title} />
						<img
							src={arrow}
							className="Back"
							alt="Back"
							onClick={() => navigate(-1)}
						></img>
					</>
				)}
			</div>
		</>
	);
}
