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
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authString = req.headers.authorization;
    const token = authString === null || authString === void 0 ? void 0 : authString.split(' ')[1];
    if (!token) {
        return res.json({ status: 401, errors: ['missing token'] });
    }
    let error = false;
    const verifyResponse = yield axios_1.default
        .post('https://auth.ezrahuang.com/verify', new URLSearchParams({ token }).toString())
        .then((res) => res.data)
        .catch((err) => {
        error = true;
        res.json({ status: 500, errors: [''] });
    });
    if (!error) {
        if (!verifyResponse.valid) {
            return res.json({ status: 401, errors: ['invalid token'] });
        }
        next();
    }
});
exports.default = authenticate;
