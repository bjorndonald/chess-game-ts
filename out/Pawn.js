"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./misc/colors");
const Piece_1 = __importDefault(require("./Piece"));
class Pawn extends Piece_1.default {
    constructor(...args) {
        super(...args, "Pawn" /* Denomination.PAWN */);
        this.getPossibleMoves = (service) => {
            var result = [];
            var { x, y } = this.position;
            if (this.color === colors_1.Color.WHITE && y == 0)
                return [];
            if (this.color === colors_1.Color.BLACK && y == 7)
                return [];
            var new_y = this.color === colors_1.Color.WHITE ? y - 1 : y + 1;
            // First possible move
            var piece = service.presentInSpace({ x, y: new_y });
            result.push({
                position: { x, y: new_y },
                valid: !piece,
                steps: 1,
            });
            // Second possible move
            if (x != 0) {
                var piece = service.presentInSpace({ x: x - 1, y: new_y });
                if ((piece === null || piece === void 0 ? void 0 : piece.color) !== this.color && !!piece)
                    result.push({
                        position: { x: x - 1, y: new_y },
                        valid: true,
                        kill: piece,
                        steps: 1,
                    });
            }
            // Third possible
            if (x != 7) {
                var piece = service.presentInSpace({ x: x + 1, y: new_y });
                if ((piece === null || piece === void 0 ? void 0 : piece.color) !== this.color && !!piece)
                    result.push({
                        position: { x: x + 1, y: new_y },
                        valid: true,
                        kill: piece,
                        steps: 1,
                    });
            }
            return result;
        };
    }
}
exports.default = Pawn;
