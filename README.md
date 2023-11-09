# Giffy

"This is a full-stack application about GIF search, aimed at learning about React, Node.js, and MongoDB."
Based on Giphy API

https://giffy-william88gm.vercel.app

Cookies_Tpken_config:

Back:
App.use(
cors({
origin: "http://localhost:3000",
withCredentials: true,
credentials: true,
optionsSuccessStatus: 200,
})
);
App.use(cookie_parser());

---

Front:

-- Login de usuario

axios.post(
`http://localhost:3002/api/users/login`,
{ username, password },
{ withCredentials: true }
)

---

Back:

-- Verificar usuario y si existe...
-- Crear token con jwt...

res.cookie("token", token, {
maxAge: 1000 _ 60 _ 60 _ 24 _ 7,
httpOnly: true,
sameSite: "none",
secure: process.env.side === "production" ? true : false,
});

res.send({
name: userFound.name,
username: userFound.username,
})

---

Front:

-- Pedir gifs estando logeado

axios.get(`${baseURL}/api/favoritos/all`, {
withCredentials: true,
})

Back:

-- Middleware que valida si el token de la cookie es valido con jwt--

response.json({gifs});
