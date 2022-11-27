"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const signup_controller_1 = require("../controllers/signup.controller");
const userjwt_middleware_1 = require("../middlewares/userjwt.middleware");
const router = express_1.default.Router();
router.post('/signup', signup_controller_1.createUserController);
router.post('/login', signup_controller_1.loginController); // @ts-ignore
router.patch('/updateusername', userjwt_middleware_1.decryptJWTToken, signup_controller_1.updateUserNameController); // @ts-ignore
router.patch('/updatepassword', userjwt_middleware_1.decryptJWTToken, signup_controller_1.updatePasswordController);
module.exports = router;
