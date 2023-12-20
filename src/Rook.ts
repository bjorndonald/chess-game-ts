import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import ChessService from "./services/ChessService";

export default class Rook extends Piece {
    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.ROOK);
    }

    override getPossibleMoves = (service: ChessService) => {
        let moves: Move[] = []
        const { x: current_x, y: current_y } = this.position;

        var start = current_x - 1, end = 7 - current_x;

        while (start > 0 || end < 8) {
            var position = { x: start, y: current_y }
            var piece = service.presentInSpace(position)
            if (!piece && start > -1) {
                moves.push({
                    position,
                    valid: true,
                    steps: current_x - start
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: current_x - start
                })
                start = -1
            }

            position = { x: end, y: current_y }
            piece = service.presentInSpace(position)
            if (!piece && end < 8) {
                moves.push({
                    position,
                    valid: true,
                    steps: current_x - start
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: current_x - start
                })
                end = 8
            }
            start--;
            end++;
        }

        var start = current_y - 1, end = 7 - current_y;

        while (start > -1 || end < 8) {
            var position = { x: current_x, y: start }
            var piece = service.presentInSpace(position)
            if (!piece && start > -1) {
                moves.push({
                    position,
                    valid: true,
                    steps: current_y - start
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: current_y - start
                })
                start = -1
            }

            position = { x: current_x, y: end }
            piece = service.presentInSpace(position)
            if (!piece && end < 8) {
                moves.push({
                    position,
                    valid: true,
                    steps: current_y - start
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: current_y - start
                })
                end = 8
            }
            start--;
            end++;
        }

        console.log(moves)
        return moves
    }
}