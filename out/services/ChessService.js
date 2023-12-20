"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSamePosition = void 0;
const Bishop_1 = __importDefault(require("../Bishop"));
const King_1 = __importDefault(require("../King"));
const Knight_1 = __importDefault(require("../Knight"));
const colors_1 = require("../misc/colors");
const strings_1 = require("../misc/strings");
const Pawn_1 = __importDefault(require("../Pawn"));
const Queen_1 = __importDefault(require("../Queen"));
const Rook_1 = __importDefault(require("../Rook"));
const isSamePosition = (a, b) => {
    return a.x === b.x && a.y === b.y;
};
exports.isSamePosition = isSamePosition;
class ChessService {
    constructor() {
        this._turn = colors_1.Color.WHITE;
        this.gameOn = true;
        this._runtimeStore = [];
        this.getPieceById = (id) => {
            const piece = this._runtimeStore.find(x => x.id === id);
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "Pawn" /* Denomination.PAWN */)
                return piece;
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "Rook" /* Denomination.ROOK */)
                return piece;
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "Knight" /* Denomination.KNIGHT */)
                return piece;
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "King" /* Denomination.KING */)
                return piece;
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "Queen" /* Denomination.QUEEN */)
                return piece;
            if ((piece === null || piece === void 0 ? void 0 : piece.denomination) === "Bishop" /* Denomination.BISHOP */)
                return piece;
            return null;
        };
        this.initializeBoard = () => {
            Array.from({ length: 8 }, (v, k) => {
                this._runtimeStore.push(new Pawn_1.default({ x: k, y: 1 }, colors_1.Color.WHITE));
            });
            Array.from({ length: 8 }, (v, k) => {
                this._runtimeStore.push(new Pawn_1.default({ x: k, y: 6 }, colors_1.Color.BLACK));
            });
            const rooks = [0, 7];
            rooks.map((x, i) => {
                this._runtimeStore.push(new Rook_1.default({ x: x, y: 0 }, colors_1.Color.WHITE));
            });
            rooks.map((x, i) => {
                this._runtimeStore.push(new Rook_1.default({ x: x, y: 7 }, colors_1.Color.BLACK));
            });
            const knights = [1, 6];
            knights.map((x, i) => {
                this._runtimeStore.push(new Knight_1.default({ x: x, y: 0 }, colors_1.Color.WHITE));
            });
            knights.map((x, i) => {
                this._runtimeStore.push(new Knight_1.default({ x: x, y: 7 }, colors_1.Color.BLACK));
            });
            const bishops = [2, 5];
            bishops.map((x, i) => {
                this._runtimeStore.push(new Bishop_1.default({ x: x, y: 0 }, colors_1.Color.WHITE));
            });
            bishops.map((x, i) => {
                this._runtimeStore.push(new Bishop_1.default({ x: x, y: 7 }, colors_1.Color.BLACK));
            });
            this._runtimeStore.push(new Queen_1.default({ x: 3, y: 0 }, colors_1.Color.WHITE));
            this._runtimeStore.push(new Queen_1.default({ x: 3, y: 7 }, colors_1.Color.BLACK));
            this._runtimeStore.push(new King_1.default({ x: 4, y: 0 }, colors_1.Color.WHITE));
            this._runtimeStore.push(new King_1.default({ x: 4, y: 7 }, colors_1.Color.BLACK));
            this.saveToStore();
        };
        this.presentInSpace = (pos) => {
            var piece = this.runtimeStore.find(x => x.position.x === pos.x && x.position.y === pos.y);
            return piece;
        };
        this.saveToStore = () => {
            localStorage.setItem(strings_1.CHESS_GAME_STORAGE_KEY, JSON.stringify(this.runtimeStore));
        };
        this.movePiece = (move, piece) => {
            if (!move.valid)
                return;
            const pieceIndex = this.runtimeStore.findIndex(x => x.id === piece.id);
            this.runtimeStore[pieceIndex].position = move.position;
            this.saveToStore();
        };
        this.killPiece = (id) => {
            const pieceIndex = this.runtimeStore.findIndex(x => x.id === id);
            this.runtimeStore[pieceIndex].kill();
            this.saveToStore();
        };
        this.possibleCheck = (piece) => {
            const moves = piece.getPossibleMoves(this);
            if (moves.some(x => { var _a; return ((_a = x.kill) === null || _a === void 0 ? void 0 : _a.denomination) === "King" /* Denomination.KING */; })) {
                const killers = this.runtimeStore.filter(x => x.color === this.alt(piece.color));
                const king = this.runtimeStore.find(x => x.color === this.alt(piece.color) && x.denomination === "King" /* Denomination.KING */);
                var kingMoves = king ? king.getPossibleMoves(this) : [];
                const count = kingMoves.length;
                for (const move of kingMoves) {
                    for (const killer of killers) {
                        if (killer.getPossibleMoves(this).some(x => (0, exports.isSamePosition)(move.position, x.position))) {
                            kingMoves = kingMoves.filter(x => !(0, exports.isSamePosition)(x.position, move.position));
                        }
                    }
                }
                if (kingMoves.length === 0) {
                    this.gameOn = false;
                    alert("Checkmate" + piece.color + " is the winner ");
                    return [];
                }
                return kingMoves;
            }
            return [];
        };
        this._possibleCheckMate = (color) => {
            // for white
            const killers = this.runtimeStore.filter(x => x.color === this.alt(color));
            const king = this.runtimeStore.find(x => x.color === color && x.denomination === "King" /* Denomination.KING */);
            var kingMoves = king ? king.getPossibleMoves(this) : [];
            const count = kingMoves.length;
            for (const move of kingMoves) {
                for (const killer of killers) {
                    if (killer.getPossibleMoves(this).some(x => (0, exports.isSamePosition)(move.position, x.position))) {
                        kingMoves = kingMoves.filter(x => !(0, exports.isSamePosition)(x.position, move.position));
                    }
                }
            }
            if (kingMoves.length === 0) {
                alert("Checkmate");
                return [];
            }
            if (kingMoves.length !== count) {
                alert("Check");
                return kingMoves;
            }
            return false;
        };
        this.alt = (color) => color === colors_1.Color.WHITE ? colors_1.Color.BLACK : colors_1.Color.WHITE;
        try {
            var store = localStorage.getItem(strings_1.CHESS_GAME_STORAGE_KEY);
            if (!!store) {
                var arr = JSON.parse(store);
                arr.map((x, i) => {
                    if (x._denomination === "Pawn" /* Denomination.PAWN */)
                        this.runtimeStore.push(new Pawn_1.default(x._position, x._color));
                    if (x._denomination === "Knight" /* Denomination.KNIGHT */)
                        this.runtimeStore.push(new Knight_1.default(x._position, x._color));
                    if (x._denomination === "Bishop" /* Denomination.BISHOP */)
                        this.runtimeStore.push(new Bishop_1.default(x._position, x._color));
                    if (x._denomination === "Rook" /* Denomination.ROOK */)
                        this.runtimeStore.push(new Rook_1.default(x._position, x._color));
                    if (x._denomination === "Queen" /* Denomination.QUEEN */)
                        this.runtimeStore.push(new Queen_1.default(x._position, x._color));
                    if (x._denomination === "King" /* Denomination.KING */)
                        this.runtimeStore.push(new King_1.default(x._position, x._color));
                });
            }
            else {
                // this._runtimeStore.push(new King({ x: 3, y: 3 }, Color.BLACK));
                // this._runtimeStore.push(new Pawn({ x: 0, y: 0 }, Color.WHITE));
                this.initializeBoard();
            }
        }
        catch (error) {
            alert("Wahala");
        }
    }
    get runtimeStore() {
        return this._runtimeStore;
    }
    get turn() {
        return this._turn;
    }
    nextTurn() {
        this._turn = this._turn === colors_1.Color.WHITE ? colors_1.Color.BLACK : colors_1.Color.WHITE;
    }
}
ChessService.retrieveData = () => {
    var store = localStorage.getItem(strings_1.CHESS_GAME_STORAGE_KEY);
    if (!store)
        return [];
    return JSON.parse(store);
};
exports.default = ChessService;
