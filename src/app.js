"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const node_schedule_1 = require("node-schedule");
const auth_1 = __importDefault(require("./middleware/auth"));
const list_1 = __importDefault(require("./routes/list"));
const b2auth_1 = __importDefault(require("./util/b2auth"));
if (process.env.ENV != 'prod') {
    const env = (0, dotenv_1.configDotenv)();
    console.log(env);
}
// 0 0 * * * -> everyday at midnight
const job = (0, node_schedule_1.scheduleJob)('0 0 * * *', b2auth_1.default.updateToken);
job.invoke();
console.log(`current token is ${b2auth_1.default.token}`);
const application = (0, express_1.default)();
application.use((0, cors_1.default)());
application.options('/list');
application.use([auth_1.default]);
application.get('/list', list_1.default);
application.listen(3010, () => { console.log(`listening on port 3010`); });
