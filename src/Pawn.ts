import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import ChessService from "./services/ChessService";

export default class Pawn extends Piece {

    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.PAWN);
    }

    override getPossibleMoves = (service: ChessService) => {
        var result: Move[] = []
        var { x, y } = this.position;
        if (this.color === Color.BLACK && y == 0) return [];
        if (this.color === Color.WHITE && y == 7) return [];
        var new_y = this.color === Color.BLACK ? y - 1 : y + 1
        // First possible move
        var piece = service.presentInSpace({ x, y: new_y })
        result.push({
            position: { x, y: new_y },
            valid: !piece,
            steps: 1,
        })

        if ((this.color === Color.BLACK && this.position.y === 6) || (this.color === Color.WHITE && this.position.y === 1)) {
            var ex_y = this.color === Color.BLACK ? y - 2 : y + 2
            var piece = service.presentInSpace({ x, y: ex_y })
            result.push({
                position: { x, y: ex_y },
                valid: !piece,
                steps: 2,
            })
        }

        // Second possible move
        if (x != 0) {
            var piece = service.presentInSpace({ x: x - 1, y: new_y })

            if (piece?.color !== this.color && !!piece)
                result.push({
                    position: { x: x - 1, y: new_y },
                    valid: true,
                    kill: piece,
                    steps: 1,
                })
        }

        // Third possible
        if (x != 7) {
            var piece = service.presentInSpace({ x: x + 1, y: new_y })
            if (piece?.color !== this.color && !!piece)
                result.push({
                    position: { x: x + 1, y: new_y },
                    valid: true,
                    kill: piece,
                    steps: 1,
                })
        }

        return result
    }
}