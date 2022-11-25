import express, { Router } from "express";
import { createUserController, loginController, updateUserNameController } from '../controllers/signup.controller'


const router : Router = express.Router();

router.post('/signup', createUserController );
router.post('/login', loginController);
// router.patch('/username', updateUserNameController);

export = router;