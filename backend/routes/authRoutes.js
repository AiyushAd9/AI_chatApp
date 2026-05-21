const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const usersFile = path.join(__dirname, "../data/users.json");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFile));

    const existing = users.find((u) => u.email === email);

    if (existing) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(),
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.json({
      msg: "User Registered"
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFile));

    const user = users.find((u) => u.email === email);

    if (!user) {
      return res.status(400).json({
        msg: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong Password"
      });
    }

    const token = jwt.sign(
      {
        user: {
          id: user.id
        }
      },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;