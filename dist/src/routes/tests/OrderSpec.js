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
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const request = (0, supertest_1.default)(index_1.default);
let token = '';
describe('User API End point ', () => {
    it('user auth ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/user/auth').set('Content-type', 'application/json').send({
            username: 'test1',
            password: 'test1'
        });
        const { token: usertoken } = res.body.data;
        token = usertoken;
    }));
    it('order create ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/order/create').set('Content-type', 'application/json').send({
            product_id: 2,
            quantity: 5,
            user_id: 1,
            status: 'active'
        });
        expect(res.body.data).toEqual({
            id: 2,
            product_id: 2,
            quantity: 5,
            user_id: 1,
            status: 'active'
        });
    }));
    it('order update', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.put('/order/update/2').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            status: 'complete'
        });
        expect(res.body.data).toEqual({
            id: 2,
            product_id: 2,
            quantity: 5,
            user_id: 1,
            status: 'complete'
        });
    }));
    it('user show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/oreder/user/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({ id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' });
    }));
    it('user delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/order/delete/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({ id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' });
    }));
});
