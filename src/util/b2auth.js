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
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const b2IdAndKey = () => {
    return `${process.env.b2AppKeyId}:${process.env.b2AppKey}`;
};
const base64encode = (s) => {
    return Buffer.from(s).toString('base64');
};
const b2Auth = {
    token: null,
    apiUrl: null,
    updateToken: () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const data = yield axios_1.default
            .get(`${constants_1.b2Base}/b2_authorize_account`, {
            headers: {
                Authorization: `Basic ${base64encode(b2IdAndKey())}`,
            },
        })
            .then((res) => res.data)
            .catch((err) => console.log(err));
        b2Auth.token = (_a = data === null || data === void 0 ? void 0 : data.authorizationToken) !== null && _a !== void 0 ? _a : null;
        b2Auth.apiUrl = (_b = data === null || data === void 0 ? void 0 : data.apiUrl) !== null && _b !== void 0 ? _b : null;
    }),
};
exports.default = b2Auth;
