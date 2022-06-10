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
exports.ProductStore = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
class ProductStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const sql = 'SELECT * FROM product';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not index products Error: ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO product (productname, price, counts) VALUES($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [
                    product.productname,
                    product.price,
                    product.counts
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not create products Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM product WHERE id=($1)';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                throw new Error(`Could not show products ${id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM product WHERE id=($1) RETURNING *';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE product SET productname=($1) , price=($2), counts=($3)  WHERE id=($4) RETURNING *';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [
                    product.productname,
                    product.price,
                    product.counts,
                    product.id
                ]);
                const book = result.rows[0];
                conn.release();
                return book;
            }
            catch (err) {
                console.log(err);
                return null;
            }
        });
    }
}
exports.ProductStore = ProductStore;
