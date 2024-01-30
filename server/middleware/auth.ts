import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
export const SECRET = process.env.SECRET_KEY;  // This should be in an environment variable in a real application

export const authenticateJwt = (req:Request,res:Response,next:NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];

      if(!SECRET){
        return res.sendStatus(403)
      }
      jwt.verify(token, SECRET, (err, payload: JwtPayload | string | undefined) => {
        if (err) {
          return res.sendStatus(403);
        }
        if(!payload){
          return res.sendStatus(403)
        }
        if(typeof payload === "string"){ 
          return res.sendStatus(403)
        }
       (req.headers as { [key: string]: any })["user"] = payload as JwtPayload;
       
        // req.headers["user"] = payload as JwtPayload
        // req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

  // module.exports = {
  //   authenticateJwt,
  //   SECRET
  // }