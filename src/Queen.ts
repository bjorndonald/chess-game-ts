import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Position } from "./misc/position";
import Piece from "./Piece";

export default class Queen extends Piece {

    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.QUEEN);
    }
}