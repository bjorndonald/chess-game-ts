import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import ChessService from "./services/ChessService";

export default class King extends Piece {

    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.KING);
    }

    override getPossibleMoves = (service: ChessService) => {
        let moves: Move[] = []
        const add = (pos: Position) => {
            var piece = service.presentInSpace(pos)
            moves.push({
                position: pos,
                valid: !piece || piece?.color !== this.color,
                kill: piece,
                steps: 4
            })
        }
        var { x: current_x, y: current_y } = this.position;


        // North
        var position: Position = { x: current_x, y: --current_y }
        if (current_y >= 0) {
            add(position)
        } 7
        // North-east 
        position = { x: ++current_x, y: current_y }
        if (current_x <= 7 && current_y >= 0) {
            add(position)
        }

        // East
        position = { x: current_x, y: ++current_y }
        if (current_x <= 7) {
            add(position)
        }

        // South-east 
        position = { x: current_x, y: ++current_y }
        if (current_x <= 7 && current_y <= 7) {
            add(position)
        }

        // South
        position = { x: --current_x, y: current_y }
        if (current_x >= 0 && current_y <= 7) {
            add(position)
        }

        // South-west
        position = { x: --current_x, y: current_y }
        if (current_x >= 0 && current_y <= 7) {
            add(position)
        }

        // West
        position = { x: current_x, y: --current_y }
        if (current_x >= 0 && current_y >= 0) {
            add(position)
        }

        // North-west
        position = { x: current_x, y: --current_y }
        if (current_x >= 0 && current_y >= 0) {
            add(position)
        }

        return moves
    }
}