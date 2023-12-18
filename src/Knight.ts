import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import ChessService from "./services/ChessService";

export default class Knight extends Piece {
    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.KNIGHT);
    }

    override getPossibleMoves = (service: ChessService) => {
        let moves: Move[] = []
        const { x: current_x, y: current_y } = this.position;

        const add = (pos: Position) => {
            var piece = service.presentInSpace(pos)
            moves.push({
                position: pos,
                valid: !piece || piece?.color !== this.color,
                kill: piece,
                steps: 4
            })
        }
        // start from north-east quadrant to south east to south west to north west
        // North-east 1
        var position: Position = { x: current_x + 1, y: current_y - 2 }
        if (current_x < 7 && current_y > 1) {
            add(position)
        }

        // North-east 2
        var position: Position = { x: current_x + 2, y: current_y - 1 }
        if (current_x < 6 && current_y > 0) {
            add(position)
        }

        // South-east 1
        var position: Position = { x: current_x + 2, y: current_y + 1 }
        if (current_x < 6 && current_y < 7) {
            add(position)
        }

        // South-east 2
        var position: Position = { x: current_x + 1, y: current_y + 2 }
        if (current_x < 7 && current_y < 6) {
            add(position)
        }

        // South-west 1
        var position: Position = { x: current_x - 1, y: current_y + 2 }
        if (current_x > 0 && current_y < 6) {
            add(position)
        }

        // South-west 2
        var position: Position = { x: current_x - 2, y: current_y + 1 }
        if (current_x > 1 && current_y < 7) {
            add(position)
        }

        // North-west 1
        var position: Position = { x: current_x - 2, y: current_y - 1 }
        if (current_x > 1 && current_y > 0) {
            add(position)
        }

        // North-west 2
        var position: Position = { x: current_x - 1, y: current_y - 2 }
        if (current_x > 0 && current_y > 1) {
            add(position)
        }

        return moves
    }
}