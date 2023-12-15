"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("../misc/colors");
const bishops_1 = require("./bishops");
const kings_1 = require("./kings");
const knights_1 = require("./knights");
const pawns_1 = require("./pawns");
const queens_1 = require("./queens");
const rooks_1 = require("./rooks");
const lightColor = "#f4f4f4";
const darkColor = "#34364C";
exports.default = {
    ["Pawn" /* Denomination.PAWN */]: {
        [colors_1.Color.WHITE]: (0, pawns_1.PAWN)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, pawns_1.PAWN)(darkColor, lightColor)
    },
    ["Bishop" /* Denomination.BISHOP */]: {
        [colors_1.Color.WHITE]: (0, bishops_1.BISHOP)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, bishops_1.BISHOP)(darkColor, lightColor)
    },
    ["King" /* Denomination.KING */]: {
        [colors_1.Color.WHITE]: (0, kings_1.KING)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, kings_1.KING)(darkColor, lightColor)
    },
    ["Knight" /* Denomination.KNIGHT */]: {
        [colors_1.Color.WHITE]: (0, knights_1.KNIGHT)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, knights_1.KNIGHT)(darkColor, lightColor)
    },
    ["Queen" /* Denomination.QUEEN */]: {
        [colors_1.Color.WHITE]: (0, queens_1.QUEEN)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, queens_1.QUEEN)(darkColor, lightColor)
    },
    ["Rook" /* Denomination.ROOK */]: {
        [colors_1.Color.WHITE]: (0, rooks_1.ROOK)(lightColor, darkColor),
        [colors_1.Color.BLACK]: (0, rooks_1.ROOK)(darkColor, lightColor)
    },
};
