"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
class King extends Piece_1.default {
    constructor(...args) {
        super(...args, "King" /* Denomination.KING */);
        this.getPossibleMoves = (service) => {
            let moves = [];
            const add = (pos) => {
                var piece = service.presentInSpace(pos);
                moves.push({
                    position: pos,
                    valid: !piece || (piece === null || piece === void 0 ? void 0 : piece.color) !== this.color,
                    kill: piece,
                    steps: 4
                });
            };
            var { x: current_x, y: current_y } = this.position;
            // North
            var position = { x: current_x, y: --current_y };
            if (current_y >= 0) {
                add(position);
            }
            7;
            // North-east 
            position = { x: ++current_x, y: current_y };
            if (current_x <= 7 && current_y >= 0) {
                add(position);
            }
            // East
            position = { x: current_x, y: ++current_y };
            if (current_x <= 7) {
                add(position);
            }
            // South-east 
            position = { x: current_x, y: ++current_y };
            if (current_x <= 7 && current_y <= 7) {
                add(position);
            }
            // South
            position = { x: --current_x, y: current_y };
            if (current_x >= 0 && current_y <= 7) {
                add(position);
            }
            // South-west
            position = { x: --current_x, y: current_y };
            if (current_x >= 0 && current_y <= 7) {
                add(position);
            }
            // West
            position = { x: current_x, y: --current_y };
            if (current_x >= 0 && current_y >= 0) {
                add(position);
            }
            // North-west
            position = { x: current_x, y: --current_y };
            if (current_x >= 0 && current_y >= 0) {
                add(position);
            }
            return moves;
        };
    }
}
exports.default = King;
