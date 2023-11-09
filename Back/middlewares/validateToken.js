import jwt from "jsonwebtoken";

export function validateToken(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(token, process.env.tokenENV, (err, infoUser) => {
    if (err) return res.status(403).json({ message: "Invalid token " });

    req.user = infoUser;
    next();
  });
}
