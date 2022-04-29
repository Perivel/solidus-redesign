/**
 * middleware.ts
 * 
 * middleware.ts defines types and interfaces for server middleware.
 */

 import { Request as ExpressReq, Response as ExpressRes, NextFunction as ExpressNext } from 'express';

export type Request = ExpressReq;
export type Response = ExpressRes;
export type NextFn = ExpressNext;

 /**
  * Middleware
  * 
  * Solidus Middleware.
  */
 
 export type Middleware = (req: Request, res: Response, next: NextFn) => Promise<void>;