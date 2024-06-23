export function getJWT(req) {
  const header = req.headers["authorization"];
  let token = "";
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    token = bearer[1];
  }
  return token;
}
function checkToken(req, res, next) {
  const token = getJWT(req);

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If token verification fails
      console.error("Token verification error:", err);
      return res.sendStatus(403);
    }

    // Check token expiration
    if (decoded.exp <= Date.now() / 1000) {
      // Token expired
      return res.status(401).json({ error: "Token expired" });
    }

    // Token is valid and not expired
    req.token = token;
    next();
  });
}

export default checkToken;
