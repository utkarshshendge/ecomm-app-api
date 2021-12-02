const router = require("express").Router();
const User = require("../models/Users");
const CryptoJs = require("crypto-js");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
      process.env.SEC_PASS
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials");

    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.SEC_PASS
    ).toString(CryptoJs.enc.Utf8);
    hashedPassword != req.body.password &&
      res.status(401).json("Wrong Credentials");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (err) {
    res.status(501).json(err);
  }
});

router;

module.exports = router;
