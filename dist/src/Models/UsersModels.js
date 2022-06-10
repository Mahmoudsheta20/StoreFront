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
exports.UserStore = void 0;
const configdb_1 = __importDefault(require("../config/configdb"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const paper = BCRYPT_PASSWORD;
const salte = SALT_ROUNDS;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) { }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (UserName, Password, FirstName, LastName, GroupID, Email) VALUES($1, $2, $3,$4, $5,$6) RETURNING *';
                // @ts-ignore
                const HashPassword = bcrypt_1.default.hashSync(user.password + paper, Number(salte));
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [
                    user.username,
                    HashPassword,
                    user.firstname,
                    user.lastname,
                    user.groupid,
                    user.email
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    show(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [ID]);
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
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE  FROM users WHERE id=($1) RETURNING *';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    authe(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield configdb_1.default.connect();
                const sql = 'SELECT password FROM users WHERE username=$1';
                const result = yield conn.query(sql, [username]);
                const user = result.rows[0];
                if (result.rows.length) {
                    if (bcrypt_1.default.compareSync(password + paper, user.password)) {
                        const userinfo = yield conn.query('SELECT * FROM users WHERE username=($1)', [username]);
                        return userinfo.rows[0];
                    }
                }
            }
            catch (err) {
                throw new Error(`Could not delete book . Error: ${err}`);
            }
            return null;
        });
    }
    update(User) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET username=($1) , firstname=($2), lastname=($3), password = ($4), email= ($5) WHERE id=($6) RETURNING *';
                // @ts-ignore
                const conn = yield configdb_1.default.connect();
                const result = yield conn.query(sql, [
                    User.username,
                    User.firstname,
                    User.lastname,
                    User.password,
                    User.email,
                    User.id
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
exports.UserStore = UserStore;
