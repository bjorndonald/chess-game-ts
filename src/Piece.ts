
import { Color } from "./misc/colors";
import { Denomination } from "./misc/denomination";
import { Move } from "./misc/move";
import { Position } from "./misc/position";
import ChessService from "./services/ChessService";

export default abstract class Piece {
    private _position: Position;
    private _denomination: Denomination;
    public get denomination(): Denomination {
        return this._denomination;
    }
    public set denomination(value: Denomination) {
        this._denomination = value;
    }
    private status: "dead" | "alive" = "alive"
    private _color: Color;

    public id: string = crypto.randomUUID();

    constructor(pos: Position, col: Color, denom: Denomination,) {
        this._position = pos;
        this._denomination = denom;
        this._color = col;
    }

    public getPossibleMoves(service: ChessService): Move[] {
        return []
    }

    public get color(): Color {
        return this._color;
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