"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphics_1 = __importDefault(require("../graphics"));
const colors_1 = require("../misc/colors");
const ChessService_1 = require("./ChessService");
function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else if (!hasClass(el, className))
        el.className += " " + className;
}
function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}
class LocalUIFactory {
    // startBlack: Starting_Position;
    // startWhite: Starting_Position;
    constructor(_service) {
        this.deadPieces = [];
        this.restrictedKingMoves = [];
        this.currentPiece = null;
        this.createPieceDOM = (piece, parentElem, shown) => {
            const div = document.createElement("div");
            div.className = `piece ${this.service.turn === colors_1.Color.WHITE ? "rotate-180" : ""}`;
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
            if (this.restrictedKingMoves.length && currentPiece.denomination !== "King" /* Denomination.KING */) {
                return;
            }
            const moves = currentPiece.getPossibleMoves(this.service);
            const move = moves.find(x => x.position.x === pos.x && x.position.y === pos.y);
            if (!move)
                return;
            if (this.restrictedKingMoves.length &&
                !this.restrictedKingMoves.some(x => (0, ChessService_1.isSamePosition)(x.position, pos)))
                return;
            ev.stopPropagation();
            if (!!move.kill) {
                this.killPiece(move.kill);
            }
            if (move.valid) {
                this.service.movePiece(move, currentPiece);
                currentPiece.position = move.position;
                const currentdom = document.getElementById(currentPiece.id);
                if (!currentdom)
                    return;
                this.fade(currentdom);
                currentdom.remove();
                const box = document.querySelector(`.row:nth-child(${move.position.y + 1}) .square:nth-child(${move.position.x + 1})`);
                const newDom = this.createPieceDOM(currentPiece, box, false);
                this.unfade(newDom);
                const restricted = this.service.possibleCheck(currentPiece);
                if (!!restricted) {
                    this.restrictedKingMoves = restricted;
                }
                this.removePossibleMoves();
                this.nextTurn();
            }
        };
        this.nextTurn = () => __awaiter(this, void 0, void 0, function* () {
            const board = document.getElementById("board");
            const piece = document.querySelectorAll(".piece");
            if (this.service.turn === colors_1.Color.WHITE) {
                yield this.fade(board);
                removeClass(board, "rotate-180");
                piece.forEach((el) => {
                    removeClass(el, "rotate-180");
                });
                yield this.unfade(board);
            }
            if (this.service.turn === colors_1.Color.BLACK) {
                yield this.fade(board);
                addClass(board, "rotate-180");
                piece.forEach((el) => {
                    addClass(el, "rotate-180");
                });
                yield this.unfade(board);
            }
            this.service.nextTurn();
        });
        this.fade = (element) => {
            return new Promise((resolve) => {
                var op = 1;
                var timer = setInterval(function () {
                    if (op <= 0.2) {
                        clearInterval(timer);
                        element.style.display = 'none';
                        resolve();
                    }
                    element.style.opacity = op + "";
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op -= op * 0.2;
                }, 50);
            });
        };
        this.unfade = (element) => {
            return new Promise((resolve) => {
                var op = 0.1;
                element.style.display = 'block';
                var timer = setInterval(function () {
                    if (op >= 1) {
                        clearInterval(timer);
                        resolve();
                    }
                    element.style.opacity = op + "";
                    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
                    op += op * 0.1;
                }, 10);
            });
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
            if ((piece === null || piece === void 0 ? void 0 : piece.color) !== this.service.turn) {
                ev.stopPropagation();
                return;
            }
            if (((_a = this.currentPiece) === null || _a === void 0 ? void 0 : _a.id) === (piece === null || piece === void 0 ? void 0 : piece.id)) {
                this.removePossibleMoves();
                return;
            }
            if (!!this.currentPiece) {
                if (((_b = this.currentPiece) === null || _b === void 0 ? void 0 : _b.color) === (piece === null || piece === void 0 ? void 0 : piece.color))
                    this.removePossibleMoves();
                return;
            }
            if (!piece)
                return;
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
