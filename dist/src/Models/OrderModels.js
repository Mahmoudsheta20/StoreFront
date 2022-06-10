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
exports.OrderStore = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
class OrderStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    createOrder(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield configdb_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                const result = yield conn.query(sql, [
                    orders.user_id,
                    orders.status
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    AddOrderProduct(orders) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield configdb_1.default.connect();
                const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [
                    orders.quantity,
                    orders.order_id,
                    orders.product_id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE  FROM orders WHERE id=$1 RETURNING *';
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
    CurrentOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield configdb_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id = ${userId} ORDER BY id DESC LIMIT 1`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get current order. Error: ${err}`);
            }
        });
    }
    update(status, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield configdb_1.default.connect();
                const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
                const result = yield conn.query(sql, [
                    status,
                    id
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.OrderStore = OrderStore;
