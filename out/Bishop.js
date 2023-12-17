"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Piece_1 = __importDefault(require("./Piece"));
class Bishop extends Piece_1.default {
    constructor(...args) {
        super(...args, "Bishop" /* Denomination.BISHOP */);
        this.getPossibleMoves = (service) => {
            let moves = [];
            const { x: current_x, y: current_y } = this.position;
            var start_x = current_x + 1;
            var start_y = current_y - 1;
            var end_x = current_x - 1;
            var end_y = current_y + 1;
            var alt_start_x = current_x + 1;
            var alt_start_y = current_y + 1;
            var alt_end_x = current_x - 1;
            var alt_end_y = current_y - 1;
            while ((start_x < 8 && start_y > -1) || (end_x > -1 && end_y < 8)
                || (alt_start_x < 8 && alt_start_y < 8)) {
                var position = { x: start_x, y: start_y };
                var piece = service.presentInSpace(position);
                if (!piece && start_x < 8 && start_y > -1) {
                    moves.push({
                        position,
                        valid: true,
                        steps: start_x - current_x
                    });
                }
                else if (!!piece && piece.color !== this.color) {
                    moves.push({
                        position,
                        kill: piece,
                        valid: true,
                        steps: start_x - current_x
                    });
                    start_x = 8;
                    start_y = -1;
                }
                start_x++;
                start_y--;
                position = { x: end_x, y: end_y };
                var piece = service.presentInSpace(position);
                if (!piece && end_x > -1 && end_y < 8) {
                    moves.push({
                        position,
                        valid: true,
                        steps: end_x - current_x
                    });
                }
                else if (!!piece && piece.color !== this.color) {
                    moves.push({
                        position,
                        kill: piece,
                        valid: true,
                        steps: end_x - current_x
                    });
                    end_x = -1;
                    end_y = 8;
                }
                end_x--;
                end_y++;
                ////////////////////////////////
                var position = { x: alt_start_x, y: alt_start_y };
                var piece = service.presentInSpace(position);
                if (alt_start_x < 8 && alt_start_y < 8) {
                    if (!piece) {
                        moves.push({
                            position,
                            valid: true,
                            steps: alt_start_x - current_x
                        });
                    }
                    else if (!!piece && piece.color !== this.color) {
                        moves.push({
                            position,
                            kill: piece,
                            valid: true,
                            steps: alt_start_x - current_x
                        });
                        alt_start_x = 8;
                        alt_start_y = 8;
                    }
                    alt_start_x++;
                    alt_start_y++;
                }
                position = { x: alt_end_x, y: alt_end_y };
                var piece = service.presentInSpace(position);
                if (!piece && alt_end_x > -1 && alt_end_y > -1) {
                    moves.push({
                        position,
                        valid: true,
                        steps: alt_end_x - current_x
                    });
                }
                else if (!!piece && piece.color !== this.color) {
                    moves.push({
                        position,
                        kill: piece,
                        valid: true,
                        steps: alt_end_x - current_x
                    });
                    alt_end_x = -1;
                    alt_end_y = -1;
                }
                alt_end_x--;
                alt_end_y--;
            }
            return moves;
        };
    }
}
exports.default = Bishop;
