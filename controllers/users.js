const User = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const SALT_LENGTH = 12;
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    // check if this user already exist
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      throw new Error("User already exist");
    }
    // hash the users password
    // if not, create a new user
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
    });
    const token = jwt.sign(
        {
          username: user.username,
          _id: user._id,
        },
        process.env.JWT_SECRET
      );

    res.status(200).json({ user, token });
    // create a token for the user
    // send back the token
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    // find the user thats trying to sign in
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw new Error("User does not exist");
    }
    // if we have a user lets compare the password with bcrypt  to the req.body.password
    if (bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      // if passwords match send back a token
      const token = jwt.sign(
        {
          username: user.username,
          _id: user._id,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({ token, user });
    } else {
      // else means password does not match
      // else send back an error
      throw new Error("Password does not match");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
module.exports = router;