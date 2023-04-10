const express = require("express");
const User = require("../Models/userModel");
const { handlerNewUser } = require("../Controllers/registerController");
const router = express.Router();

// GET all users
router.get("/", (req, res) => {
  res.json({ mssg: "Get All Users" });
});

//Get a single user
router.get("/:id", (req, res) => {
  res.json({ mssg: "Get a single user" });
});

//Post a new User
router.post("/register", async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || pwd)
    return res.status(400).json({ messagge: "Name and password are required" });

  // check for duplication in db
  const duplication = await User.findOne({ userName: user }).exec();
  if (duplication) return res.sendStatus(409); // Conflict

  try {
    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);
    res.status(200).json({ success: `New user ${user} created` });
  } catch (error) {
    res.status(400).json({ massege: error.messagge });
  }
  res.json({ mssg: "Post a new user" });
});

//Post a new User
router.delete("/:id", (req, res) => {
  res.json({ mssg: "Delete a new user" });
});

//Post a new User
router.patch("/:id", (req, res) => {
  res.json({ mssg: "Update a new user" });
});

module.exports = router;
