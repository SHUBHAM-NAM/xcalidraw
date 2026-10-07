import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from '@repo/backendcommon/config'
function authmiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "unauthenticated" });
  }

  try {
    const decoded = jwt.verify(token, "jwtsecret") as { username: string };
    (req as Request & { username?: string }).username = decoded.username;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "unauthenticated" });
  }
}

export default authmiddleware;