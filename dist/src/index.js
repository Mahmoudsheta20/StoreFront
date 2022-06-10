"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const ProductRoute_1 = __importDefault(require("./routes/ProductRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('hello api ');
});
app.listen(3000, () => {
    console.log('localhost');
});
(0, UserRoute_1.default)(app);
(0, ProductRoute_1.default)(app);
(0, OrderRoute_1.default)(app);
exports.default = app;
