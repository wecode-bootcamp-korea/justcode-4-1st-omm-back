const jwt = require("jsonwebtoken");

const ValidateToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if(authorization === undefined){
    return res.status(403).json({ message: "로그인이 필요합니다." });
  }
  const decodeToken = new Promise((resolve, reject) => {
    jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

  if (!authorization) {
    return res.status(403).json({ message: "로그인이 필요합니다." });
  }

  decodeToken
    .then((decoded) => res.json(decoded))
    .catch((err) =>
      res
        .status(403)
        .json({ success: false, message: err.message, result: "WRONG_TOKEN" })
    );

 decodeToken;
  next();
};

module.exports = { ValidateToken };
