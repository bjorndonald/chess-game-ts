import { move } from "../misc/move";
import { Position } from "../misc/position";
import { CHESS_GAME_STORAGE_KEY } from "../misc/strings";
import { Piece } from "../Piece";

class ChessService {
    runtimeStore: Piece[]


    constructor() {
        try {
            var store = localStorage.getItem(CHESS_GAME_STORAGE_KEY)
            if (!!store) {
                this.runtimeStore = JSON.parse(store)
            } else this.runtimeStore = []
        } catch (error) {
            console.error(error)
            this.runtimeStore = [];
        }
    }

    presentInSpace = (pos: Position): Piece | undefined => {
        var currentState = this.runtimeStore;
        var piece = currentState.find(x => x.position.x === pos.x && x.position.y === pos.y)
        return piece
    }

    retrieveData = (): Piece[] => {
        var store: string | null = localStorage.getItem(CHESS_GAME_STORAGE_KEY);
        if (!store) return [];
        return JSON.parse(store)
    }

    movePiece = (move: move, piece: Piece) => {
        if (!move.valid) return;
        const pieceIndex = this.runtimeStore.findIndex(x => x.id === piece.id)
        this.runtimeStore[pieceIndex].position = move.position;
        if (!move.kill) return;
        this.runtimeStore[pieceIndex].kill();
    }
}

export default ChessService