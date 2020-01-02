import { AuthState } from "../state";
import {
  SignUpActions,
  SIGN_UP_STARTED,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED
} from "../actions/sign-up";
import { merge } from "../merge";

const INITIAL_STATE: AuthState = {
  currentUser: null,
  ui: {
    signUp: { busy: false }
  }
};

type SupportedActions = SignUpActions;

const reducer = (
  state = INITIAL_STATE,
  action: SupportedActions
): AuthState => {
  switch (action.type) {
    case SIGN_UP_STARTED:
      return merge(state, {
        ui: { signUp: { busy: true, errorMessage: undefined } }
      });

    case SIGN_UP_SUCCEEDED:
      return merge(
        state,
        { currentUser: action.payload },
        { ui: { signUp: { busy: false } } }
      );

    case SIGN_UP_FAILED:
      return merge(state, {
        ui: { signUp: { busy: false, errorMessage: action.payload } }
      });

    default:
      return state;
  }
};

export default reducer;
