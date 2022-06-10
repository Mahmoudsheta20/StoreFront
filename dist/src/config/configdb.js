"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.POSTGRES_DB_TEST = exports.ENV = exports.POSTGRES_PORT = exports.POSTGRES_PASSWORD = exports.POSTGRES_USER = exports.POSTGRES_DB = exports.POSTGRES_HOST = void 0;
const pg_1 = require("pg");
require("dotenv/config");
_a = process.env, exports.POSTGRES_HOST = _a.POSTGRES_HOST, exports.POSTGRES_DB = _a.POSTGRES_DB, exports.POSTGRES_USER = _a.POSTGRES_USER, exports.POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, exports.POSTGRES_PORT = _a.POSTGRES_PORT, exports.ENV = _a.ENV, exports.POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST;
const Store = new pg_1.Pool({
    host: exports.POSTGRES_HOST,
    database: exports.ENV === 'dev' ? exports.POSTGRES_DB : exports.POSTGRES_DB_TEST,
    user: exports.POSTGRES_USER,
    password: exports.POSTGRES_PASSWORD,
    port: Number(exports.POSTGRES_PORT)
});
exports.default = Store;
