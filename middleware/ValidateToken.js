const jwt = require("jsonwebtoken");

const ValidateToken = async (req, res, next) => {
  const { Autorization } = req.headers;
  const decodeToken = new Promise((resolve, reject) => {
    jwt.verify(Autorization, env.process.SECRET_KEY, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });

  if (!Autorization) {
    return res.statis(403).json({ message: "로그인이 필요합니다." });
  }

  decodeToken
    .then((decoded) => res.json(decoded))
    .catch((err) =>
      res
        .status(403)
        .json({ success: false, message: err.message, result: "WRONG_TOKEN" })
    );

  next();
};

module.exports = { ValidateToken };
