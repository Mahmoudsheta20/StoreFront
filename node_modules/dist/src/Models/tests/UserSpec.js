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
/* eslint-disable no-undef */
const UsersModels_1 = require("../UsersModels");
const store = new UsersModels_1.UserStore();
describe('User Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(store.update).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            username: 'test2',
            password: 'test2',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test2@gmail.com'
        });
        expect(result === null || result === void 0 ? void 0 : result.id).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.firstname).toEqual('Mahmoud');
        expect(result === null || result === void 0 ? void 0 : result.password).not.toEqual('test1');
        expect(result === null || result === void 0 ? void 0 : result.lastname).toEqual('Sheta');
        expect(result === null || result === void 0 ? void 0 : result.username).toEqual('test2');
        expect(result === null || result === void 0 ? void 0 : result.groupid).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.email).toEqual('test2@gmail.com');
    }));
    it('index method should return a list of user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result === null || result === void 0 ? void 0 : result.length).toBe(2);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('2');
        expect(result === null || result === void 0 ? void 0 : result.id).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.firstname).toEqual('Mahmoud');
        expect(result === null || result === void 0 ? void 0 : result.password).not.toEqual('test2');
        expect(result === null || result === void 0 ? void 0 : result.lastname).toEqual('Sheta');
        expect(result === null || result === void 0 ? void 0 : result.username).toEqual('test2');
        expect(result === null || result === void 0 ? void 0 : result.groupid).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.email).toEqual('test2@gmail.com');
    }));
    it('auth delete method should authintaction the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.authe('test2', 'test2');
        expect(result === null || result === void 0 ? void 0 : result.id).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.firstname).toEqual('Mahmoud');
        expect(result === null || result === void 0 ? void 0 : result.password).not.toEqual('test2');
        expect(result === null || result === void 0 ? void 0 : result.lastname).toEqual('Sheta');
        expect(result === null || result === void 0 ? void 0 : result.username).toEqual('test2');
        expect(result === null || result === void 0 ? void 0 : result.groupid).toEqual(2);
        expect(result === null || result === void 0 ? void 0 : result.email).toEqual('test2@gmail.com');
    }));
    it('update method should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.update({
            username: 'test3',
            password: 'test2',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test2@gmail.com',
            id: 2
        });
        expect(result).toEqual({
            username: 'test3',
            password: 'test2',
            firstname: 'Mahmoud',
            lastname: 'Sheta',
            groupid: 2,
            email: 'test2@gmail.com',
            id: 2
        });
    }));
});
