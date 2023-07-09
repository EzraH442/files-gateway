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
const b2auth_1 = __importDefault(require("../util/b2auth"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('list');
    const params = new URLSearchParams({
        bucketId: process.env.bucketSourceId,
        maxFileCount: '10000',
    });
    const response = yield axios_1.default
        .get(`${b2auth_1.default.apiUrl}/b2api/v2/b2_list_file_names`, {
        params,
        headers: {
            Authorization: b2auth_1.default.token,
        },
    })
        .then((res) => res.data)
        .catch((err) => {
        console.log(err);
    });
    if (response.status === 400) {
        res.status(400);
        return res.json({ errors: ['unknown error'] });
    }
    const files = response.files.map((file) => {
        return { id: file.fileId, name: file.fileName };
    });
    res.status(200);
    return res.json({
        errors: [],
        files,
    });
});
exports.default = list;
