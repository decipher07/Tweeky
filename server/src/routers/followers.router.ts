import express, { Router } from "express";
import { followAUserController, getAllFollowingsOfTheUser, getAllUsers } from "../controllers/followers.controller";
import { decryptJWTToken } from "../middlewares/userjwt.middleware";

const router : Router = express.Router();

// @ts-ignore
router.post('/followUser', decryptJWTToken, followAUserController ); // @ts-ignore
router.get('/allfollowings', decryptJWTToken, getAllFollowingsOfTheUser); // @ts-ignore
router.get('/getAllUsers', decryptJWTToken, getAllUsers);

export = router;