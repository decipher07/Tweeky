"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.get('/', auth_controller_1.getGoogleAuthURLController);
router.get('/redirect', auth_controller_1.redirectGoogleAuthController);
module.exports = router;