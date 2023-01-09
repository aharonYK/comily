const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status("401").send("access denide no token provied"); //401 = no token egsist
  try {
    const decoded = jwt.verify(token, 'dan and yali');
    req.user = decoded;
    next(); //! next = continue to the next middelwere
  } catch (error) {
    res.status(400).send("invalid token");
  }
};
