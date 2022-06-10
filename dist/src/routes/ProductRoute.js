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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Authentiation_1 = __importDefault(require("../../middleware/Authentiation"));
const ProductModel_1 = require("../Models/ProductModel");
const productstore = new ProductModel_1.ProductStore();
const Index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield productstore.index();
    res.json(data);
});
const Create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        productname: req.body.productname,
        counts: Number(req.body.counts),
        price: Number(req.body.price)
    };
    try {
        const create = yield productstore.create(product);
        res.json({
            status: 'success',
            data: Object.assign({}, create),
            message: 'user authenticated successfully'
        });
    }
    catch (_a) {
        res.status(400);
        res.json('thers wrong');
    }
});
const Delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const delet = yield productstore.delete(id);
        res.json({
            status: 'success',
            data: Object.assign({}, delet),
            message: 'user authenticated successfully'
        });
    }
    catch (_b) {
        res.status(400);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const show = yield productstore.show(id);
        res.json({
            status: 'success',
            data: Object.assign({}, show),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json(err);
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        productname: req.body.productname,
        counts: req.body.counts,
        price: req.body.price,
        id: req.params.id
    };
    try {
        const update = yield productstore.update(product);
        res.json({
            status: 'success',
            data: Object.assign({}, update),
            message: 'user authenticated successfully'
        });
    }
    catch (_c) {
        res.status(400);
    }
});
const Product = (app) => {
    app.get('/product', Index);
    app.post('/product', Authentiation_1.default, Create);
    app.get('/product/:id', Authentiation_1.default, show);
    app.delete('/product/delete/:id', Authentiation_1.default, Delete);
    app.put('/product/:id', Authentiation_1.default, updateProduct);
};
exports.default = Product;
