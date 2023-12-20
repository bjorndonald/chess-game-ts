import graphics from "../graphics";
import { Color } from "../misc/colors";
import { Denomination } from "../misc/denomination";
import { Move } from "../misc/move";
import { Position } from "../misc/position";
import Pawn from "../Pawn";
import Piece from "../Piece";
import ChessService, { isSamePosition } from "./ChessService";

function range(size: number, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}

function hasClass(el: Element, className: string) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el: Element, className: string) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el: Element, className: string) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}

class LocalUIFactory {
    service: ChessService;
    deadPieces: Piece[] = []
    restrictedKingMoves: Move[] = []
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
        div.className = `piece ${this.service.turn === Color.WHITE ? "rotate-180" : ""}`;
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
        if (this.restrictedKingMoves.length && currentPiece.denomination !== Denomination.KING) {
            return
        }

        const moves = currentPiece.getPossibleMoves(this.service)
        const move = moves.find(x => x.position.x === pos.x && x.position.y === pos.y)
        if (!move) return;
        if (this.restrictedKingMoves.length &&
            !this.restrictedKingMoves.some(x => isSamePosition(x.position, pos)))
            return

        ev.stopPropagation()

        if (!!move.kill) {
            this.killPiece(move.kill)
        }
        if (move.valid) {
            this.service.movePiece(move, currentPiece)
            currentPiece.position = move.position
            const currentdom = document.getElementById(currentPiece.id)
            if (!currentdom) return;
            this.fade(currentdom);
            currentdom.remove();
            const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
            const newDom = this.createPieceDOM(currentPiece, box, false)
            this.unfade(newDom)
            const restricted = this.service.possibleCheck(currentPiece)
            if (!!restricted) {
                this.restrictedKingMoves = restricted
            }
            this.removePossibleMoves()
            this.nextTurn()
        }

    }

    nextTurn = async () => {
        const board = document.getElementById("board")
        const piece = document.querySelectorAll(".piece")
        if (this.service.turn === Color.WHITE) {
            await this.fade(board!)
            removeClass(board!, "rotate-180")
            piece.forEach((el) => {
                removeClass(el, "rotate-180")
            })
            await this.unfade(board!)
        }

        if (this.service.turn === Color.BLACK) {
            await this.fade(board!)
            addClass(board!, "rotate-180")
            piece.forEach((el) => {
                addClass(el, "rotate-180")
            })
            await this.unfade(board!)
        }

        this.service.nextTurn()
    }

    fade = (element: HTMLElement) => {
        return new Promise((resolve: Function) => {
            var op = 1;
            var timer = setInterval(function () {
                if (op <= 0.2) {
                    clearInterval(timer);
                    element.style.display = 'none';
                    resolve()
                }
                element.style.opacity = op + "";
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op -= op * 0.2;
            }, 50);
        })
    }

    unfade = (element: HTMLElement) => {
        return new Promise((resolve: Function) => {
            var op = 0.1;
            element.style.display = 'block';
            var timer = setInterval(function () {
                if (op >= 1) {
                    clearInterval(timer);
                    resolve()
                }
                element.style.opacity = op + "";
                element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                op += op * 0.1;
            }, 10);
        })
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
        if (piece?.color !== this.service.turn) {
            ev.stopPropagation()
            return;
        }
        if (this.currentPiece?.id === piece?.id) {
            this.removePossibleMoves()
            return
        }

        if (!!this.currentPiece) {
            if (this.currentPiece?.color === piece?.color)
                this.removePossibleMoves()
            return
        }
        if (!piece) return
        this.currentPiece = piece
        const moves = piece.getPossibleMoves(this.service)

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