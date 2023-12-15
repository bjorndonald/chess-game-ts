import graphics from "../graphics";
import { Position } from "../misc/position";
import Pawn from "../Pawn";
import Piece from "../Piece";
import ChessService from "./ChessService";

function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

class LocalUIFactory {
    service: ChessService;
    deadPieces: Piece[] = []
    currentPiece: Piece | null = null;
    // startBlack: Starting_Position;
    // startWhite: Starting_Position;
    constructor(_service: ChessService) {
        this.service = _service;
        this.initialize()
    }

    initialize() {
        this.service.runtimeStore.map((piece) => {
            const box = document.querySelector(`.row:nth-child(${piece.position.y + 1}) .square:nth-child(${piece.position.x + 1})`);
            this.createPieceDOM(piece, box, true)
        })

        range(8).map(y => {
            range(8).map(x => {
                const box = document.querySelector(`.row:nth-child(${y + 1}) .square:nth-child(${x + 1})`);
                box?.addEventListener("click", (e) => this.movePiece({ x, y }, e))
            })
        })
    }

    createPieceDOM = (piece: Piece, parentElem: Element | null, shown: boolean) => {
        const div = document.createElement("div");
        div.className = "piece";
        if (!shown)
            div.style.display = "none";
        div.id = piece.id
        div.addEventListener("click", this.togglePossibleMoves)
        div.innerHTML = graphics[piece.denomination][piece.color]
        parentElem?.appendChild(div);
        return div
    }

    movePiece = (pos: Position, ev: Event) => {
        const currentPiece = this.currentPiece!
        if (currentPiece == null) return;

        const moves = currentPiece.getPossibleMoves(this.service)
        const move = moves.find(x => x.position.x === pos.x && x.position.y === pos.y)
        if (!move) return;
        ev.stopPropagation()

        if (!!move.kill) {
            this.killPiece(move.kill)
        }
        if (move.valid) {
            const currentdom = document.getElementById(currentPiece.id)
            if (!currentdom) return;
            this.fade(currentdom);
            currentdom.remove();
            const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
            const newDom = this.createPieceDOM(currentPiece, box, false)
            this.unfade(newDom)

            this.currentPiece = null
            const circle = document.querySelectorAll(".circle, .danger, .invalid")
            circle.forEach(e => e.remove())
        }

    }

    fade = (element: HTMLElement) => {
        var op = 1;
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op + "";
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    unfade = (element: HTMLElement) => {
        var op = 0.1;
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op + "";
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 10);
    }

    killPiece = (piece: Piece) => {
        this.deadPieces.push(piece)
        const dom = document.getElementById(piece.id)
        dom?.remove()

        this.service.killPiece(piece.id)
    }

    removePossibleMoves = () => {
        this.currentPiece = null
        const circle = document.querySelectorAll(".circle, .danger, .invalid")
        circle.forEach(e => e.remove())
    }

    togglePossibleMoves = (ev: MouseEvent) => {
        const elem = ev?.target as Element
        const piece = this.service.getPieceById(elem.id)

        if (this.currentPiece?.id === piece?.id) {
            this.removePossibleMoves()
            return
        }

        if (!!this.currentPiece) {
            if (this.currentPiece?.color === piece?.color)
                this.removePossibleMoves()
            else return
        }

        this.currentPiece = piece
        const moves = (piece as Pawn).getPossibleMoves(this.service)

        moves.map((move) => {
            const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
            if (!move.valid) {
                const invalid = document.createElement("div");
                invalid.className = "invalid"
                box?.appendChild(invalid)
            }
            else if (move.kill) {
                const danger = document.createElement("div");
                danger.className = "danger"
                box?.appendChild(danger)
            } else {
                const circle = document.createElement("div");
                circle.className = "circle"
                box?.appendChild(circle)
            }
        })
    }
}

export default LocalUIFactory