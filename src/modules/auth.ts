import jwt, { Secret } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePasswords = (password, hash) => {
  // bcrypt.compare compare's hash with plain text(password) under ther hood.
  return bcrypt.compare(password, hash);
};

export const hashPassword = async (password) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: any) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as Secret
  );

  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret);
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.json({ message: "not valid token" });
    return;
  }
};
