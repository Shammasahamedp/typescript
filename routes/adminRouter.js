"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController = require('../controllers/adminController');
const adminRouter = express_1.default.Router();
adminRouter.get('/', adminController.getDashboard);
adminRouter.get('/add', adminController.getUserAdd);
adminRouter.post('/add', adminController.postUser);
adminRouter.delete('/delete', adminController.deletUser);
module.exports = adminRouter;
