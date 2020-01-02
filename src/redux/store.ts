import { applyMiddleware, createStore, AnyAction } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { SIGN_UP_STARTED } from "./actions/sign-up";
import { merge } from "./merge";
import rootReducer from "./reducers";

const actionSanitizer = <A extends AnyAction>(action: A): A => {
  switch (action.type) {
    case SIGN_UP_STARTED:
      return merge(action, { payload: { password: undefined } });
    default:
      return action;
  }
};
const composeEnhancers = composeWithDevTools({ actionSanitizer });
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
