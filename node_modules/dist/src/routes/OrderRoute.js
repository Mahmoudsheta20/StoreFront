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
const createorder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = {
        product_id: req.body.product_id,
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status
    };
    try {
        const result = yield orderstore.create(orders);
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
    app.put('/order/update/:id', UpdateStatus);
    app.delete('/order/delete/:id', deleteOrder);
    app.get('/order/index', index);
    app.post('/order/create', createorder);
    app.get('/oreder/user/:id', current);
};
exports.default = Orders;
