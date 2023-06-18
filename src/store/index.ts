import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { mySaga } from "./sagas";
import { dataReducer } from "./reducer";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ dataReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
