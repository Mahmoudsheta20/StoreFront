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
const OrderModels_1 = require("../OrderModels");
const ProductModel_1 = require("../ProductModel");
const UsersModels_1 = require("../UsersModels");
/* eslint-disable no-undef */
const order = new OrderModels_1.OrderStore();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.createOrder).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.delete).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.CurrentOrder).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.update).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.AddOrderProduct).toBeDefined();
    });
});
describe('Craete Order', () => {
    const user = new UsersModels_1.UserStore();
    const product = new ProductModel_1.ProductStore();
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create({
            username: 'test1',
            password: 'test1',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test1@gmail.com'
        });
        yield product.create({
            productname: 'IPHONE X',
            price: 999,
            counts: 5
        });
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.createOrder({
            user_id: '1',
            status: 'active'
        });
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'active'
        });
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.AddOrderProduct({
            quantity: 5,
            product_id: '1',
            order_id: '1'
        });
        expect(result).toEqual({
            order_id: '1',
            product_id: '1',
            quantity: 5
        });
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.CurrentOrder(1);
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'active'
        });
    }));
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.update('complete', 1);
        expect(result).toEqual({
            id: 1,
            user_id: '1',
            status: 'complete'
        });
    }));
});
