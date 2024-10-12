"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../model/user');
const getDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find();
    res.render('admindashboard', { users, searchterm: '' });
});
const getUserAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('adminadduser');
});
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password } = req.body;
        console.log('name', name, email, phone, password);
        const user = yield User.findOne({ email: email });
        if (user) {
            return res.json({ message: 'user is already exists' });
        }
        const newUser = new User({
            email: email,
            password: password,
            name: name,
            phone: phone
        });
        yield newUser.save();
        if (!newUser) {
            res.status(404).json({ message: 'error occured during add user' });
        }
        console.log('this is after');
        res.json({ message: 'user has added' });
    }
    catch (err) {
        console.log('error occured', err);
    }
});
const deletUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const data = yield User.findByIdAndDelete(userId);
        if (data) {
            res.json({ message: 'deleted successfully' });
        }
    }
    catch (err) {
        console.log('error has occured', err);
    }
});
const getEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.userId;
        const user = yield User.findById(userId);
        res.render('adminedit', { user });
    }
    catch (err) {
        console.log(err);
    }
});
const postEdit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.method);
        const { name, phone, email, userId } = req.body;
        const user = yield User.findByIdAndUpdate(userId, { name, phone, email });
        if (user) {
            res.json({ message: 'updated successfully' });
        }
        else {
            res.status(400).json({ message: 'user not found' });
        }
    }
    catch (err) {
        console.log('error occured', err);
    }
});
module.exports = {
    getDashboard,
    getUserAdd,
    postUser,
    deletUser,
    getEdit, postEdit
};
