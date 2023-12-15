import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Position } from "./misc/position";
import Piece from "./Piece";

export default class Knight extends Piece {
    constructor(...args: [pos: Position, color: Color,]) {
        super(...args, Denomination.KNIGHT);
    }
}