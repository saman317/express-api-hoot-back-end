const express = require("express");
const router = express.Router();
// Add in JWT package
const jwt = require("jsonwebtoken");

router.get("/sign-token", (req, res) => {
  // fake user to test
  const user = {
    _id: 1,
    username: "SA",
    password: "toastyMarsh",
  };

  // use JWT to make a token
  const token = jwt.sign({ user }, process.env.JWT_SECRET);

  res.json({ token });
});

router.post("/verify-token", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.user)

    res.json({ decoded });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;