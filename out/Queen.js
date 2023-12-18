"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bishop_1 = __importDefault(require("./Bishop"));
const Piece_1 = __importDefault(require("./Piece"));
const Rook_1 = __importDefault(require("./Rook"));
class Queen extends Piece_1.default {
    constructor(...args) {
        super(...args, "Queen" /* Denomination.QUEEN */);
        this.getPossibleMoves = (service) => {
            let moves = [];
            moves.push(...new Rook_1.default(this.position, this.color).getPossibleMoves(service));
            moves.push(...new Bishop_1.default(this.position, this.color).getPossibleMoves(service));
            return moves;
        };
    }
}
exports.default = Queen;
