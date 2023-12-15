import ChessService from "./services/ChessService";
import LocalUIFactory from "./services/LocalUIFactory";
const service = new ChessService()
var factory = new LocalUIFactory(service)