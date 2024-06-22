import express from "express";
import bcrypt from "bcrypt";
import User from "./user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ? register user
router.post("/user/register", async (req, res) => {
  console.log("hello");
  // extract new user from req.body
  const newUser = req.body;

  //  find user by email
  const user = await User.findOne({ email: newUser.email });

  // if user already exist, throw error
  if (user) {
    return res.status(409).send({ message: "Email already exists." });
  }

  // hash password
  const plainPassword = newUser.password;
  const saltRound = 10; // to add randomness
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

  // replace plain password by hashed password
  newUser.password = hashedPassword;

  // save user
  await User.create(newUser);

  // send res
  return res.status(201).send({ message: "User is registered successfully." });
});

// ?login user
router.post("/user/login", async (req, res) => {
  // extract login credentials from req.body
  const loginCredentials = req.body;

  // find user using email
  const user = await User.findOne({
    email: loginCredentials.email.toLowerCase(),
  });

  //  if not user, throw error
  if (!user) {
    return res.status(404).send({ message: "Invalid credentials." });
  }

  // check for password match
  const plainPassword = loginCredentials.password;
  const hashedPassword = user.password;
  const passwordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  // if not password match, throw error
  if (!passwordMatch) {
    return res.status(404).send({ message: "Invalid credentials." });
  }
  // generate token(JSON Web Token)
  const payload = { email: user.email };

  const accesstoken = jwt.sign(payload, "a62d710b234c410df300", {
    expiresIn: "1d",
  });

  user.password = undefined;
  // send res
  return res
    .status(200)
    .send({ message: "success", userDetails: user, token: accesstoken });
});

export default router;
