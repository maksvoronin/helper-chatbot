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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.getSystems = void 0;
const getSystems = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/system/all`).then(r => r.json());
    if (response.status === "error")
        throw new Error("Some error: " + response.message);
    return response.data;
});
exports.getSystems = getSystems;
const getComments = (system_id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`https://helper.voronin.xyz/api/dev/${process.env.HELPER_TOKEN}/comment/system?id=${system_id}`).then(r => r.json());
    if (response.status === "error")
        throw new Error("Some error: " + response.message);
    return response.data;
});
exports.getComments = getComments;
