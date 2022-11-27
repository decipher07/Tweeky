"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const post_content_controller_1 = require("../controllers/post.content.controller");
const userjwt_middleware_1 = require("../middlewares/userjwt.middleware");
const router = express_1.default.Router();
// @ts-ignore
router.post('/post', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.createPostController); // @ts-ignore
router.patch('/updatepost', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.updatePostController); // @ts-ignore
router.delete('/deletepost', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.deletePostController); // @ts-ignore
router.get('/me/all', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.getAllPostsByAUser); // @ts-ignore
router.get('/post', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.getAParticularPost); // @ts-ignore
router.get('/feeds', userjwt_middleware_1.decryptJWTToken, post_content_controller_1.getPostsFromAllTheFollowings);
module.exports = router;
