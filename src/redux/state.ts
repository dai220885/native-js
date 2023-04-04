import { combineReducers, createStore } from "redux";
import { currencyReducer } from './currencyReducer';


const rootReducer = combineReducers({
    currency: currencyReducer,
});
//export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
export type RootStateType = ReturnType<typeof store.getState>;


// @ts-ignore
window.store = store