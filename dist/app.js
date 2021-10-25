"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const users_1 = __importDefault(require("./routes/users"));
const express_graphql_1 = require("express-graphql");
const config_1 = __importDefault(require("config"));
const auth_1 = __importDefault(require("./middleware/auth"));
const registration_1 = __importDefault(require("./routes/registration"));
const schema_1 = __importDefault(require("./models/schema"));
const auth_2 = __importDefault(require("./routes/auth"));
if (!config_1.default.get("jwtPrivateKey")) {
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}
const dotenv = require("dotenv");
const app = (0, express_1.default)();
dotenv.config();
const connectDB = require("./config/db");
connectDB();
// view engine setup
app.set("views", path_1.default.join(__dirname, "..", "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
app.use("/", index_1.default);
app.use("/users", users_1.default);
app.use("/", index_1.default);
app.use("/user", registration_1.default);
app.use("/user/auth", auth_2.default);
app.use("/graphql", auth_1.default, (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    graphiql: true,
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map