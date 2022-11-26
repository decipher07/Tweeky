import express, { Router } from "express";
import { followAUserController } from "../controllers/followers.controller";
import { decryptJWTToken } from "../middlewares/userjwt.middleware";

const router : Router = express.Router();

// @ts-ignore
router.post('/followUser', decryptJWTToken, followAUserController ); // @ts-ignore


export = router;