import { Piece } from "../Piece"
import { Position } from "./position"

export type move = {
    position: Position,
    valid: boolean,
    steps?: number
    kill?: Piece
}