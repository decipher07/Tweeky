import express, { Router } from "express";
import { createUserController } from '../controllers/signup.controller'


const router : Router = express.Router();

router.post('/signup', createUserController );

export = router;