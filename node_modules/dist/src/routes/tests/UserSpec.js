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
        const { id, username, token: usertoken } = res.body.data;
        expect(id).toBe(1);
        expect(username).toBe('test1');
        token = usertoken;
    }));
    it('users index', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/user/index')
            .set('Authorization', 'Bearer ' + token);
        expect(res.status).toBe(200);
    }));
    it('user create', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/user/create').set('Content-type', 'application/json').send({
            username: 'test4',
            password: 'test4',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test4@gmail.com'
        });
        expect(res.body.data.id).toEqual(3);
        expect(res.body.data.firstname).toEqual('Mahmoud');
        expect(res.body.data.password).not.toEqual('test4');
        expect(res.body.data.lastname).toEqual('Sheta');
        expect(res.body.data.username).toEqual('test4');
        expect(res.body.data.groupid).toEqual(2);
        expect(res.body.data.email).toEqual('test4@gmail.com');
    }));
    it('user update', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.put('/user/update/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token).send({
            username: 'test5',
            password: 'test4',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test4@gmail.com'
        });
        expect(res.body.data).toEqual({
            id: 3,
            username: 'test5',
            password: 'test4',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test4@gmail.com'
        });
    }));
    it('user show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/user/show/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({
            id: 3,
            username: 'test5',
            password: 'test4',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test4@gmail.com'
        });
    }));
    it('user delete', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete('/user/delete/3').set('Content-type', 'application/json').set('Authorization', 'Bearer ' + token);
        expect(res.body.data).toEqual({
            id: 3,
            username: 'test5',
            password: 'test4',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test4@gmail.com'
        });
    }));
});
