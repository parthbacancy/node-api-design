import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error: any) {
    error.type = "input";
    next(error);
  }
};

export const signin = async (req, res) => {
  const user: any = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  // 'user.password' is hash
  // 'req.body.password' is plain text
  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send("Invalid Username or Password");
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
