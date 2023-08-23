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
exports.getComments = exports.getSystems = void 0;
const axios_1 = __importDefault(require("axios"));
const getSystems = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = (yield axios_1.default.get(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/system/all`));
    if (response.data.status === "error")
        throw new Error("Some error: " + response.data.message);
    return response.data.data;
});
exports.getSystems = getSystems;
const getComments = (system_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/comment/system?id=${system_id}`);
    if (response.data.status === "error")
        throw new Error("Some error: " + response.data.message);
    return response.data.data;
});
exports.getComments = getComments;
