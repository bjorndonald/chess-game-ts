"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphics_1 = __importDefault(require("../graphics"));
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
class LocalUIFactory {
    // startBlack: Starting_Position;
    // startWhite: Starting_Position;
    constructor(_service) {
        this.deadPieces = [];
        this.currentPiece = null;
        this.createPieceDOM = (piece, parentElem, shown) => {
            const div = document.createElement("div");
            div.className = "piece";
            if (!shown)
                div.style.display = "none";
            div.id = piece.id;
            div.addEventListener("click", this.togglePossibleMoves);
            div.innerHTML = graphics_1.default[piece.denomination][piece.color];
            parentElem === null || parentElem === void 0 ? void 0 : parentElem.appendChild(div);
            return div;
        };
        this.movePiece = (pos, ev) => {
            const currentPiece = this.currentPiece;
            if (currentPiece == null)
                return;
            const moves = currentPiece.getPossibleMoves(this.service);
            const move = moves.find(x => x.position.x === pos.x && x.position.y === pos.y);
            if (!move)
                return;
            ev.stopPropagation();
            if (!!move.kill) {
                this.killPiece(move.kill);
            }
            if (move.valid) {
                const currentdom = document.getElementById(currentPiece.id);
                if (!currentdom)
                    return;
                this.fade(currentdom);
                currentdom.remove();
                const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
                const newDom = this.createPieceDOM(currentPiece, box, false);
                this.unfade(newDom);
                this.currentPiece = null;
                const circle = document.querySelectorAll(".circle, .danger, .invalid");
                circle.forEach(e => e.remove());
            }
        };
        this.fade = (element) => {
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
        };
        this.unfade = (element) => {
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
        };
        this.killPiece = (piece) => {
            this.deadPieces.push(piece);
            const dom = document.getElementById(piece.id);
            dom === null || dom === void 0 ? void 0 : dom.remove();
            this.service.killPiece(piece.id);
        };
        this.removePossibleMoves = () => {
            this.currentPiece = null;
            const circle = document.querySelectorAll(".circle, .danger, .invalid");
            circle.forEach(e => e.remove());
        };
        this.togglePossibleMoves = (ev) => {
            var _a, _b;
            const elem = ev === null || ev === void 0 ? void 0 : ev.target;
            const piece = this.service.getPieceById(elem.id);
            if (((_a = this.currentPiece) === null || _a === void 0 ? void 0 : _a.id) === (piece === null || piece === void 0 ? void 0 : piece.id)) {
                this.removePossibleMoves();
                return;
            }
            if (!!this.currentPiece) {
                if (((_b = this.currentPiece) === null || _b === void 0 ? void 0 : _b.color) === (piece === null || piece === void 0 ? void 0 : piece.color))
                    this.removePossibleMoves();
                else
                    return;
            }
            this.currentPiece = piece;
            const moves = piece.getPossibleMoves(this.service);
            moves.map((move) => {
                const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
                if (!move.valid) {
                    const invalid = document.createElement("div");
                    invalid.className = "invalid";
                    box === null || box === void 0 ? void 0 : box.appendChild(invalid);
                }
                else if (move.kill) {
                    const danger = document.createElement("div");
                    danger.className = "danger";
                    box === null || box === void 0 ? void 0 : box.appendChild(danger);
                }
                else {
                    const circle = document.createElement("div");
                    circle.className = "circle";
                    box === null || box === void 0 ? void 0 : box.appendChild(circle);
                }
            });
        };
        this.service = _service;
        this.initialize();
    }
    initialize() {
        this.service.runtimeStore.map((piece) => {
            const box = document.querySelector(`.row:nth-child(${piece.position.y + 1}) .square:nth-child(${piece.position.x + 1})`);
            this.createPieceDOM(piece, box, true);
        });
        range(8).map(y => {
            range(8).map(x => {
                const box = document.querySelector(`.row:nth-child(${y + 1}) .square:nth-child(${x + 1})`);
                box === null || box === void 0 ? void 0 : box.addEventListener("click", (e) => this.movePiece({ x, y }, e));
            });
        });
    }
}
exports.default = LocalUIFactory;
