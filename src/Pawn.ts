import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { move } from "./misc/move";
import { Position } from "./misc/position";
import { Piece } from "./Piece";
import ChessService from "./services/ChessService";

export default class Pawn extends Piece {
    service: ChessService
    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.PAWN);
        this.service = new ChessService()
    }

    getPossibleMoves = () => {
        var result: move[] = []
        var { x, y } = this.position;
        // if ()
        // First possible move
        var piece = this.service.presentInSpace({ x, y: ++y })
        // result.push({
        //     position: 
        // })
    }
}