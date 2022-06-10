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
const ProductModel_1 = require("../ProductModel");
/* eslint-disable no-undef */
const store = new ProductModel_1.ProductStore();
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
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            productname: 'IPHONE 12',
            price: 999,
            counts: 5
        });
        expect(result).toEqual({
            id: 2,
            productname: 'IPHONE 12',
            price: 999,
            counts: 5
        });
    }));
    it('index method should return a list of user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result === null || result === void 0 ? void 0 : result.length).toBe(2);
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show('2');
        expect(result).toEqual({
            id: 2,
            productname: 'IPHONE 12',
            price: 999,
            counts: 5
        });
    }));
});
