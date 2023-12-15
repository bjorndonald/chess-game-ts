import Piece from "../Piece"
import { Position } from "./position"

export type Move = {
    position: Position,
    valid: boolean,
    steps?: number
    kill?: Piece
}