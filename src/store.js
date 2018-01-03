import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

const middleware = applyMiddleware(logger, thunk);

export default createStore(reducers, middleware);