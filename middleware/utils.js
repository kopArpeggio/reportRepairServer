const jwt = require("jsonwebtoken");

exports.createToken = (userId, username, role) => {
  return jwt.sign(
    {
      id: userId,
      username: username,
      role: role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7 days" }
  );
};
