import Bishop from "./Bishop";
import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import Piece from "./Piece";
import Rook from "./Rook";
import ChessService from "./services/ChessService";

export default class Queen extends Piece {
    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.QUEEN);
    }

    override getPossibleMoves = (service: ChessService) => {
        let moves: Move[] = []
        moves.push(...new Rook(this.position, this.color).getPossibleMoves(service))
        moves.push(...new Bishop(this.position, this.color).getPossibleMoves(service))
        return moves
    }
}