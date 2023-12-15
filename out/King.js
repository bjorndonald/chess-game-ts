"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
class King extends Piece_1.default {
    constructor(...args) {
        super(...args, "King" /* Denomination.KING */);
    }
}
exports.default = King;
