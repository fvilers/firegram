import { UserState } from "../state";
import {
  GetProfileActions,
  GET_PROFILE_STARTED,
  GET_PROFILE_SUCCEEDED,
  GET_PROFILE_FAILED
} from "../actions/get-profile";
import {
  UpdateProfileActions,
  UPDATE_PROFILE_STARTED,
  UPDATE_PROFILE_SUCCEEDED,
  UPDATE_PROFILE_FAILED
} from "../actions/update-profile";
import { merge } from "../helpers";

const INITIAL_STATE: UserState = {
  collection: {},
  ui: {
    getProfile: { busy: false },
    updateProfile: { busy: false }
  }
};

type SupportedActions = GetProfileActions | UpdateProfileActions;

const reducer = (
  state = INITIAL_STATE,
  action: SupportedActions
): UserState => {
  switch (action.type) {
    case GET_PROFILE_STARTED:
      return merge(state, {
        ui: { getProfile: { busy: true, errorMessage: undefined } }
      });

    case GET_PROFILE_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { getProfile: { busy: false } } }
      );

    case GET_PROFILE_FAILED:
      return merge(state, {
        ui: { getProfile: { busy: false, errorMessage: action.payload } }
      });

    case UPDATE_PROFILE_STARTED:
      return merge(state, {
        ui: { updateProfile: { busy: true, errorMessage: undefined } }
      });

    case UPDATE_PROFILE_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { updateProfile: { busy: false } } }
      );

    case UPDATE_PROFILE_FAILED:
      return merge(state, {
        ui: { updateProfile: { busy: false, errorMessage: action.payload } }
      });

    default:
      return state;
  }
};

export default reducer;
