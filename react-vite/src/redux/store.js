import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
<<<<<<< HEAD
import menuReducer from "./menu";
import menuItemReducer from "./menu_item";

const rootReducer = combineReducers({
  session: sessionReducer,
  menu: menuReducer,
  menu_item: menuItemReducer
=======
import restaurantsReducer from "./restaurants";

const rootReducer = combineReducers({
  session: sessionReducer,
  restaurants: restaurantsReducer
>>>>>>> dev
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
