import { PostState } from "../state";
import {
  CreatePostActions,
  CREATE_POST_STARTED,
  CREATE_POST_SUCCEEDED,
  CREATE_POST_FAILED
} from "../actions/create-post";
import { merge } from "../merge";

const INITIAL_STATE: PostState = {
  collection: {},
  ui: {
    createPost: { busy: false }
  }
};

type SupportedActions = CreatePostActions;

const reducer = (
  state = INITIAL_STATE,
  action: SupportedActions
): PostState => {
  switch (action.type) {
    case CREATE_POST_STARTED:
      return merge(state, {
        ui: { createPost: { busy: true, errorMessage: undefined } }
      });

    case CREATE_POST_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { createPost: { busy: false } } }
      );

    case CREATE_POST_FAILED:
      return merge(state, {
        ui: { createPost: { busy: false, errorMessage: action.payload } }
      });

    default:
      return state;
  }
};

export default reducer;
