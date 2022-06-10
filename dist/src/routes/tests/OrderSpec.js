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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJpZCI6MzEsInVzZXJuYW1lIjoidGVzdDEiLCJwYXNzd29yZCI6IiQyYiQxMCRLQnhoQlp5Q0NBOS41Yi5BZjl5WXB1czRnZ3BqZ09hVE5wZzFIaVAyTTkuSnhjLjVQVGhQYSIsImZpcnN0bmFtZSI6Ik1haG1vdWQiLCJsYXN0bmFtZSI6IlNoZXRhIiwiZ3JvdXBpZCI6MiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20ifSwiaWF0IjoxNjU0MjcxOTIwfQ.MpTh2R80WsQ0licQ-q5hZprK7C71wkJT36myZ15WLeM';
describe('User API End point ', () => {
    it('order create ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/order/create').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            user_id: '2',
            status: 'active'
        });
        expect(res.body.data).toEqual({
            id: 2,
            user_id: '2',
            status: 'active'
        });
    }));
    it('order update', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/order/addproduct/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            product_id: '2',
            quantity: 5
        });
        expect(res.body.data).toEqual({
            order_id: '1',
            product_id: '2',
            quantity: 5
        });
    }));
    // it('user show', async () => {
    //   const res = await request.get('/oreder/user/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    //   expect(res.body.data).toEqual({ id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' })
    // })
    // it('user delete', async () => {
    //   const res = await request.delete('/order/delete/1').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token)
    //   expect(res.body.data).toEqual(
    //     { id: 2, product_id: 2, quantity: 5, user_id: 1, status: 'complete' }
    //   )
    // })
});
