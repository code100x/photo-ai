import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.AUTH_JWT_KEY, {
            algorithms: ['RS256'] 
        });
        if (decoded?.sub) {
            req.userId = decoded.sub;
            next();
        } else {
            res.status(403).json({
                message: "Error while decoding"
            });
        }
    } catch(e) {
        res.status(403).json({
            message: "Error while decoding"
        });
    }
}