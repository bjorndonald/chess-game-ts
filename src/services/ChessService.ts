import Bishop from "../Bishop";
import King from "../King";
import Knight from "../Knight";
import { Color } from "../misc/colors";
import { Denomination } from "../misc/denomination";
import { Move } from "../misc/move";
import { Position } from "../misc/position";
import { CHESS_GAME_STORAGE_KEY } from "../misc/strings";
import Pawn from "../Pawn";
import Piece from "../Piece";
import Queen from "../Queen";
import Rook from "../Rook";

export const isSamePosition = (a: Position, b: Position) => {
    return a.x === b.x && a.y === b.y
}

class ChessService {
    private _turn = Color.WHITE;
    gameOn = true;
    private _runtimeStore: Piece[] = [];

    constructor() {
        try {
            var store = localStorage.getItem(CHESS_GAME_STORAGE_KEY)
            if (!!store) {
                var arr: {
                    _position: Position,
                    _color: Color,
                    id: string,
                    _denomination: Denomination,
                    status: string
                }[] = JSON.parse(store)
                arr.map((x, i) => {
                    if (x._denomination === Denomination.PAWN)
                        this.runtimeStore.push(new Pawn(x._position, x._color))
                    if (x._denomination === Denomination.KNIGHT)
                        this.runtimeStore.push(new Knight(x._position, x._color))
                    if (x._denomination === Denomination.BISHOP)
                        this.runtimeStore.push(new Bishop(x._position, x._color))
                    if (x._denomination === Denomination.ROOK)
                        this.runtimeStore.push(new Rook(x._position, x._color))
                    if (x._denomination === Denomination.QUEEN)
                        this.runtimeStore.push(new Queen(x._position, x._color))
                    if (x._denomination === Denomination.KING)
                        this.runtimeStore.push(new King(x._position, x._color))
                })
            } else {
                // this._runtimeStore.push(new King({ x: 3, y: 3 }, Color.BLACK));

                // this._runtimeStore.push(new Pawn({ x: 0, y: 0 }, Color.WHITE));
                this.initializeBoard()
            }
        } catch (error) {
            alert("Wahala")
        }
    }

    public get runtimeStore(): Piece[] {
        return this._runtimeStore;
    }

    getPieceById = (id: string) => {
        const piece = this._runtimeStore.find(x => x.id === id)
        if (piece?.denomination === Denomination.PAWN)
            return piece as Pawn
        if (piece?.denomination === Denomination.ROOK)
            return piece as Rook
        if (piece?.denomination === Denomination.KNIGHT)
            return piece as Knight
        if (piece?.denomination === Denomination.KING)
            return piece as King
        if (piece?.denomination === Denomination.QUEEN)
            return piece as Queen
        if (piece?.denomination === Denomination.BISHOP)
            return piece as Bishop
        return null
    }

    initializeBoard = () => {
        Array.from({ length: 8 },
            (v, k) => {
                this._runtimeStore.push(new Pawn({ x: k, y: 1 }, Color.WHITE))
            })
        Array.from({ length: 8 },
            (v, k) => {
                this._runtimeStore.push(new Pawn({ x: k, y: 6 }, Color.BLACK))
            })
        const rooks = [0, 7];
        rooks.map((x, i) => {
            this._runtimeStore.push(new Rook({ x: x, y: 0 }, Color.WHITE));
        })
        rooks.map((x, i) => {
            this._runtimeStore.push(new Rook({ x: x, y: 7 }, Color.BLACK));
        })

        const knights = [1, 6];
        knights.map((x, i) => {
            this._runtimeStore.push(new Knight({ x: x, y: 0 }, Color.WHITE));
        })
        knights.map((x, i) => {
            this._runtimeStore.push(new Knight({ x: x, y: 7 }, Color.BLACK));
        })

        const bishops = [2, 5];
        bishops.map((x, i) => {
            this._runtimeStore.push(new Bishop({ x: x, y: 0 }, Color.WHITE));
        })
        bishops.map((x, i) => {
            this._runtimeStore.push(new Bishop({ x: x, y: 7 }, Color.BLACK));
        })

        this._runtimeStore.push(new Queen({ x: 3, y: 0 }, Color.WHITE));
        this._runtimeStore.push(new Queen({ x: 3, y: 7 }, Color.BLACK));

        this._runtimeStore.push(new King({ x: 4, y: 0 }, Color.WHITE));
        this._runtimeStore.push(new King({ x: 4, y: 7 }, Color.BLACK));
        this.saveToStore()
    }

    presentInSpace = (pos: Position): Piece | undefined => {
        var piece = this.runtimeStore.find(x => x.position.x === pos.x && x.position.y === pos.y)
        return piece
    }

    saveToStore = () => {
        localStorage.setItem(CHESS_GAME_STORAGE_KEY, JSON.stringify(this.runtimeStore))
    }

    static retrieveData = (): Piece[] => {
        var store: string | null = localStorage.getItem(CHESS_GAME_STORAGE_KEY);
        if (!store) return [];
        return JSON.parse(store)
    }

    movePiece = (move: Move, piece: Piece) => {
        if (!move.valid) return;
        const pieceIndex = this.runtimeStore.findIndex(x => x.id === piece.id)
        this.runtimeStore[pieceIndex].position = move.position;

        this.saveToStore()
    }

    killPiece = (id: string) => {
        const pieceIndex = this.runtimeStore.findIndex(x => x.id === id)
        this.runtimeStore[pieceIndex].kill();
        this.saveToStore()
    }

    public get turn() {
        return this._turn;
    }

    public nextTurn() {
        this._turn = this._turn === Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    possibleCheck = (piece: Piece): Move[] => {
        const moves = piece.getPossibleMoves(this)
        if (moves.some(x => x.kill?.denomination === Denomination.KING)) {
            const killers = this.runtimeStore.filter(x => x.color === this.alt(piece.color))
            const king = this.runtimeStore.find(x => x.color === this.alt(piece.color) && x.denomination === Denomination.KING)
            var kingMoves = king ? king.getPossibleMoves(this) : []
            const count = kingMoves.length
            for (const move of kingMoves) {
                for (const killer of killers) {
                    if (killer.getPossibleMoves(this).some(x => isSamePosition(move.position, x.position))) {
                        kingMoves = kingMoves.filter(x => !isSamePosition(x.position, move.position))
                    }
                }
            }
            if (kingMoves.length === 0) {
                this.gameOn = false;
                alert("Checkmate" + piece.color + " is the winner ");
                return []
            }

            return kingMoves
        }
        return []
    }

    _possibleCheckMate = (color: Color) => {
        // for white
        const killers = this.runtimeStore.filter(x => x.color === this.alt(color))
        const king = this.runtimeStore.find(x => x.color === color && x.denomination === Denomination.KING)
        var kingMoves = king ? king.getPossibleMoves(this) : []
        const count = kingMoves.length
        for (const move of kingMoves) {
            for (const killer of killers) {
                if (killer.getPossibleMoves(this).some(x => isSamePosition(move.position, x.position))) {
                    kingMoves = kingMoves.filter(x => !isSamePosition(x.position, move.position))
                }
            }
        }

        if (kingMoves.length === 0) {
            alert("Checkmate")
            return []
        }
        if (kingMoves.length !== count) {
            alert("Check")
            return kingMoves
        }

        return false
    }

    private alt = (color: Color) => color === Color.WHITE ? Color.BLACK : Color.WHITE


}

export default ChessService