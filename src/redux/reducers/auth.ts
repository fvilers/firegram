import { AuthState } from "../state";
import {
  AuthStateActions,
  AUTH_STATE_CHANGED,
  AUTH_STATE_FAILED
} from "../actions/auth-state";
import {
  SignInActions,
  SIGN_IN_STARTED,
  SIGN_IN_SUCCEEDED,
  SIGN_IN_FAILED
} from "../actions/sign-in";
import {
  SignUpActions,
  SIGN_UP_STARTED,
  SIGN_UP_SUCCEEDED,
  SIGN_UP_FAILED
} from "../actions/sign-up";
import { merge } from "../merge";

const INITIAL_STATE: AuthState = {
  currentUser: null,
  ready: false,
  ui: {
    signIn: { busy: false },
    signUp: { busy: false }
  }
};

type SupportedActions = AuthStateActions | SignInActions | SignUpActions;

const reducer = (
  state = INITIAL_STATE,
  action: SupportedActions
): AuthState => {
  switch (action.type) {
    case AUTH_STATE_CHANGED:
      return merge(state, { currentUser: action.payload, ready: true });

    case AUTH_STATE_FAILED:
      return merge(state, { errorMessage: action.payload, ready: true });

    case SIGN_IN_STARTED:
      return merge(state, {
        ui: { signIn: { busy: true, errorMessage: undefined } }
      });

    case SIGN_IN_SUCCEEDED:
      return merge(
        state,
        { currentUser: action.payload },
        { ui: { signIn: { busy: false } } }
      );

    case SIGN_IN_FAILED:
      return merge(state, {
        ui: { signIn: { busy: false, errorMessage: action.payload } }
      });

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
