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
        expect(res.status).toBe(200);
        const { token: usertoken } = res.body.data;
        token = usertoken;
    }));
    it('product index', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/product')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('product create', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/product').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            productname: 'iphone 12 pro',
            counts: 100,
            price: 499
        });
        expect(res.body.data).toEqual({
            id: 3,
            productname: 'iphone 12 pro',
            counts: 100,
            price: 499
        });
    }));
    it('product show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/product/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({
            id: 3,
            productname: 'iphone 12 pro',
            counts: 100,
            price: 499
        });
    }));
    it('product update', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.put('/product/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            productname: 'iphone 12 pro max',
            counts: 100,
            price: 499
        });
        expect(res.body.data).toEqual({
            id: 3,
            productname: 'iphone 12 pro max',
            counts: 100,
            price: 499
        });
    }));
    it('user delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/product/delete/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({
            id: 3,
            productname: 'iphone 12 pro max',
            counts: 100,
            price: 499
        });
    }));
});
