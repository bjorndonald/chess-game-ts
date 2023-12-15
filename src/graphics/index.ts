import { Color } from "../misc/colors";
import { Denomination } from "../misc/denomination";
import { BISHOP } from "./bishops";
import { KING } from "./kings";
import { KNIGHT } from "./knights";
import { PAWN } from "./pawns";
import { QUEEN } from "./queens";
import { ROOK } from "./rooks";

const lightColor = "#f4f4f4";
const darkColor = "#34364C";

export default {
    [Denomination.PAWN]: {
        [Color.WHITE]: PAWN(lightColor, darkColor),
        [Color.BLACK]: PAWN(darkColor, lightColor)
    },
    [Denomination.BISHOP]: {
        [Color.WHITE]: BISHOP(lightColor, darkColor),
        [Color.BLACK]: BISHOP(darkColor, lightColor)
    },
    [Denomination.KING]: {
        [Color.WHITE]: KING(lightColor, darkColor),
        [Color.BLACK]: KING(darkColor, lightColor)
    },
    [Denomination.KNIGHT]: {
        [Color.WHITE]: KNIGHT(lightColor, darkColor),
        [Color.BLACK]: KNIGHT(darkColor, lightColor)
    },
    [Denomination.QUEEN]: {
        [Color.WHITE]: QUEEN(lightColor, darkColor),
        [Color.BLACK]: QUEEN(darkColor, lightColor)
    },
    [Denomination.ROOK]: {
        [Color.WHITE]: ROOK(lightColor, darkColor),
        [Color.BLACK]: ROOK(darkColor, lightColor)
    },
}