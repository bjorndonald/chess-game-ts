"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChessService_1 = __importDefault(require("./ChessService"));
class LocalUIFactory {
    constructor(startForBlack, startForWhite) {
        this.service = new ChessService_1.default();
        this.startBlack = startForBlack;
        this.startWhite = startForWhite;
    }
    initialize() {
        var x = 2;
        var y = 1;
        Array.from({ length: 5 }, (v, k) => {
            console.log(k);
        });
    }
}
