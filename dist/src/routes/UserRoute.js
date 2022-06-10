"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const UsersModels_1 = require("../Models/UsersModels");
const Authentiation_1 = __importStar(require("../../middleware/Authentiation"));
const userstore = new UsersModels_1.UserStore();
const Index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield userstore.index();
        res.json({
            status: 'success',
            data: result,
            message: 'user authenticated successfully'
        });
    }
    catch (_a) { }
});
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        groupid: Number(req.body.groupid),
        email: req.body.email
    };
    try {
        const create = yield userstore.create(user);
        res.json({
            status: 'success',
            data: Object.assign({}, create),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.status(401);
        res.json('sad');
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = String(req.params.id);
    try {
        const UserShow = yield userstore.show(id);
        res.json({
            status: 'success',
            data: Object.assign({}, UserShow),
            message: 'user authenticated successfully'
        });
    }
    catch (_b) {
        res.json({
            message: `user id:${id} does not exist`
        });
    }
});
const DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const UserShow = yield userstore.delete(id);
        res.json({
            data: Object.assign({}, UserShow)
        });
    }
    catch (_c) {
        res.status(400);
    }
});
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const UserAuth = yield userstore.authe(username, password);
        if (UserAuth) {
            const token = (0, Authentiation_1.getTokenByUser)(UserAuth);
            res.json({
                status: 'success',
                data: Object.assign(Object.assign({}, UserAuth), { token }),
                message: 'user authenticated successfully'
            });
        }
    }
    catch (_d) {
        res.status(400);
        res.json('User or Password is not Exit');
    }
});
const ubdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        id: req.params.id
    };
    try {
        const update = yield userstore.update(user);
        res.json({
            status: 'success',
            data: Object.assign({}, update),
            message: 'user authenticated successfully'
        });
    }
    catch (_e) {
        res.status(400);
    }
});
const Users = (app) => {
    app.get('/user/index', Authentiation_1.default, Index);
    app.post('/user/create', Create);
    app.get('/user/show/:id', Authentiation_1.default, show);
    app.delete('/user/delete/:id', Authentiation_1.default, DELETE);
    app.post('/user/auth', auth);
    app.put('/user/update/:id', Authentiation_1.default, ubdate);
};
exports.default = Users;
