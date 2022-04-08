const ValidateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "KEY_ERROR",
      에러_메시지: "이메일 혹은 패스워드가 입력되지 않았습니다.",
    });
  }
  next();
};

module.exports = { ValidateLogin };
