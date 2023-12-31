"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChessService_1 = __importDefault(require("./services/ChessService"));
const LocalUIFactory_1 = __importDefault(require("./services/LocalUIFactory"));
const service = new ChessService_1.default();
var factory = new LocalUIFactory_1.default(service);
