import express, { Router } from "express";
import { createPostController, updatePostController, deletePostController } from '../controllers/post.content.controller'
import { decryptJWTToken } from "../middlewares/userjwt.middleware";

const router : Router = express.Router();

// @ts-ignore
router.post('/post', decryptJWTToken, createPostController ); // @ts-ignore
router.patch('/updatepost', decryptJWTToken, updatePostController); // @ts-ignore
router.delete('/deletepost', decryptJWTToken, deletePostController);

export = router;