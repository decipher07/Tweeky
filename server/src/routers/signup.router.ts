import express, { Router } from "express";
import { createUserController, loginController, updatePasswordController, updateUserNameController } from '../controllers/signup.controller'
import { decryptJWTToken } from "../middlewares/userjwt.middleware";

const router : Router = express.Router();

router.post('/signup', createUserController );
router.post('/login', loginController); // @ts-ignore
router.patch('/updateusername', decryptJWTToken, updateUserNameController); // @ts-ignore
router.patch('/updatepassword', decryptJWTToken, updatePasswordController);

export = router;