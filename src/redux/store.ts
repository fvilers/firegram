import { applyMiddleware, createStore, AnyAction } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { SIGN_IN_STARTED } from "./actions/sign-in";
import { SIGN_UP_STARTED } from "./actions/sign-up";
import { CREATE_POST_STARTED } from "./actions/create-post";
import { merge } from "./helpers";
import rootReducer from "./reducers";

const actionSanitizer = <A extends AnyAction>(action: A): A => {
  switch (action.type) {
    case SIGN_IN_STARTED:
      return merge(action, { payload: { password: undefined } });
    case SIGN_UP_STARTED:
      return merge(action, { payload: { password: undefined } });
    case CREATE_POST_STARTED:
      return merge(action, { payload: { fileContent: "<<LONG_BLOB>>" } });
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
