import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  //  extract token from req.headers
  const authorization = req?.headers?.authorization;

  const splittedValues = authorization?.split(" ");

  const token = splittedValues?.length === 2 ? splittedValues[1] : null;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // verify token
  let payload;

  try {
    payload = jwt.verify(token, "a62d710b234c410df300");
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  next();
};
