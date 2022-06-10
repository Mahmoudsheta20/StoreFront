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
const OrderModels_1 = require("../Models/OrderModels");
const orderstore = new OrderModels_1.OrderStore();
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orderstore.index();
        res.json({
            status: 'success',
            data: result,
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        console.log(err);
    }
});
const AddProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        order_id: req.params.id,
        product_id: req.body.product_id,
        quantity: req.body.quantity
    };
    try {
        const result = yield orderstore.AddOrderProduct(order);
        res.json({
            status: 'success',
            data: Object.assign({}, result),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json(err);
    }
});
const createorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = {
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const result = yield orderstore.createOrder(orders);
        res.json({
            status: 'success',
            data: Object.assign({}, result),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json(err);
    }
});
const current = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield orderstore.CurrentOrder(id);
        res.json({
            status: 'success',
            data: result,
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json({
            status: 'worng',
            message: `${err}`
        });
    }
});
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield orderstore.delete(id);
        res.json({
            status: 'success',
            data: Object.assign({}, result),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json(err);
    }
});
const UpdateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const status = req.body.status;
    try {
        const result = yield orderstore.update(status, id);
        res.json({
            status: 'success',
            data: Object.assign({}, result),
            message: 'user authenticated successfully'
        });
    }
    catch (err) {
        res.json(err);
    }
});
const Orders = (app) => {
    //
    app.put('/order/update/:id', Authentiation_1.default, UpdateStatus);
    app.delete('/order/delete/:id', Authentiation_1.default, deleteOrder);
    app.get('/order/index', Authentiation_1.default, index);
    app.post('/order/addproduct/:id', AddProduct);
    app.post('/order/create', Authentiation_1.default, createorder);
    app.get('/oreder/user/:id', Authentiation_1.default, current);
};
exports.default = Orders;
