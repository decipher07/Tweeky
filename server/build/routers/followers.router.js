"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const followers_controller_1 = require("../controllers/followers.controller");
const userjwt_middleware_1 = require("../middlewares/userjwt.middleware");
const router = express_1.default.Router();
// @ts-ignore
router.post('/followUser', userjwt_middleware_1.decryptJWTToken, followers_controller_1.followAUserController); // @ts-ignore
router.get('/allfollowings', userjwt_middleware_1.decryptJWTToken, followers_controller_1.getAllFollowingsOfTheUser); // @ts-ignore
router.get('/getAllUsers', userjwt_middleware_1.decryptJWTToken, followers_controller_1.getAllUsers);
module.exports = router;
