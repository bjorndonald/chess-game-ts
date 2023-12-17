import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import ChessService from "./services/ChessService";

export default class Bishop extends Piece {

    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.BISHOP);
    }

    override getPossibleMoves = (service: ChessService) => {
        let moves: Move[] = []
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
            var position = { x: start_x, y: start_y }
            var piece = service.presentInSpace(position)

            if (!piece && start_x < 8 && start_y > -1) {
                moves.push({
                    position,
                    valid: true,
                    steps: start_x - current_x
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: start_x - current_x
                })
                start_x = 8
                start_y = -1
            }

            start_x++;
            start_y--;

            position = { x: end_x, y: end_y }
            var piece = service.presentInSpace(position)

            if (!piece && end_x > -1 && end_y < 8) {
                moves.push({
                    position,
                    valid: true,
                    steps: end_x - current_x
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: end_x - current_x
                })
                end_x = -1
                end_y = 8
            }

            end_x--;
            end_y++;

            ////////////////////////////////

            var position = { x: alt_start_x, y: alt_start_y }
            var piece = service.presentInSpace(position)
            if (alt_start_x < 8 && alt_start_y < 8) {
                if (!piece) {
                    moves.push({
                        position,
                        valid: true,
                        steps: alt_start_x - current_x
                    })
                } else if (!!piece && piece.color !== this.color) {
                    moves.push({
                        position,
                        kill: piece,
                        valid: true,
                        steps: alt_start_x - current_x
                    })
                    alt_start_x = 8
                    alt_start_y = 8
                }

                alt_start_x++;
                alt_start_y++;
            }

            position = { x: alt_end_x, y: alt_end_y }
            var piece = service.presentInSpace(position)

            if (!piece && alt_end_x > -1 && alt_end_y > -1) {
                moves.push({
                    position,
                    valid: true,
                    steps: alt_end_x - current_x
                })
            } else if (!!piece && piece.color !== this.color) {
                moves.push({
                    position,
                    kill: piece,
                    valid: true,
                    steps: alt_end_x - current_x
                })
                alt_end_x = -1
                alt_end_y = -1
            }

            alt_end_x--;
            alt_end_y--;
        }




        return moves

    }
}