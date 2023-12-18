"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
class Knight extends Piece_1.default {
    constructor(...args) {
        super(...args, "Knight" /* Denomination.KNIGHT */);
        this.getPossibleMoves = (service) => {
            let moves = [];
            const { x: current_x, y: current_y } = this.position;
            const add = (pos) => {
                var piece = service.presentInSpace(pos);
                moves.push({
                    position: pos,
                    valid: !piece || (piece === null || piece === void 0 ? void 0 : piece.color) !== this.color,
                    kill: piece,
                    steps: 4
                });
            };
            // start from north-east quadrant to south east to south west to north west
            // North-east 1
            var position = { x: current_x + 1, y: current_y - 2 };
            if (current_x < 7 && current_y > 1) {
                add(position);
            }
            // North-east 2
            var position = { x: current_x + 2, y: current_y - 1 };
            if (current_x < 6 && current_y > 0) {
                add(position);
            }
            // South-east 1
            var position = { x: current_x + 2, y: current_y + 1 };
            if (current_x < 6 && current_y < 7) {
                add(position);
            }
            // South-east 2
            var position = { x: current_x + 1, y: current_y + 2 };
            if (current_x < 7 && current_y < 6) {
                add(position);
            }
            // South-west 1
            var position = { x: current_x - 1, y: current_y + 2 };
            if (current_x > 0 && current_y < 6) {
                add(position);
            }
            // South-west 2
            var position = { x: current_x - 2, y: current_y + 1 };
            if (current_x > 1 && current_y < 7) {
                add(position);
            }
            // North-west 1
            var position = { x: current_x - 2, y: current_y - 1 };
            if (current_x > 1 && current_y > 0) {
                add(position);
            }
            // North-west 2
            var position = { x: current_x - 1, y: current_y - 2 };
            if (current_x > 0 && current_y > 1) {
                add(position);
            }
            return moves;
        };
    }
}
exports.default = Knight;
