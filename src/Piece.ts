import { uuid } from "uuidv4";
import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { move } from "./misc/move";
import { Position } from "./misc/position";

export abstract class Piece {
    private _position: Position;
    private denomination: Denomination
    private status: "dead" | "alive" = "alive"
    private color: Color
    public id: string = uuid();

    constructor(pos: Position, col: Color, denom: Denomination,) {
        this._position = pos;
        this.denomination = denom;
        this.color = col;
    }

    public get position(): Position {
        return this._position;
    }
    public set position(value: Position) {
        this._position = value;
    }

    kill = () => {
        this.status = "dead"
    }
}