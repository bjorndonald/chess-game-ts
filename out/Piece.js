"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    get denomination() {
        return this._denomination;
    }
    set denomination(value) {
        this._denomination = value;
    }
    constructor(pos, col, denom) {
        this.status = "alive";
        this.id = crypto.randomUUID();
        this.kill = () => {
            this.status = "dead";
        };
        this._position = pos;
        this._denomination = denom;
        this._color = col;
    }
    getPossibleMoves(service) {
        return [];
    }
    get color() {
        return this._color;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
}
exports.default = Piece;
