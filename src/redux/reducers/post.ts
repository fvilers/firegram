import { PostState } from "../state";
import {
  CreatePostActions,
  CREATE_POST_STARTED,
  CREATE_POST_SUCCEEDED,
  CREATE_POST_FAILED
} from "../actions/create-post";
import {
  FindPostsActions,
  FIND_POSTS_STARTED,
  FIND_POSTS_SUCCEEDED,
  FIND_POSTS_FAILED
} from "../actions/find-posts";
import {
  GetPostActions,
  GET_POST_STARTED,
  GET_POST_SUCCEEDED,
  GET_POST_FAILED
} from "../actions/get-post";
import { merge, toObject } from "../helpers";

const INITIAL_STATE: PostState = {
  collection: {},
  ui: {
    createPost: { busy: false },
    findPosts: { busy: false },
    getPost: { busy: false }
  }
};

type SupportedActions = CreatePostActions | FindPostsActions | GetPostActions;

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

    case FIND_POSTS_STARTED:
      return merge(state, {
        ui: { findPosts: { busy: true, errorMessage: undefined } }
      });

    case FIND_POSTS_SUCCEEDED:
      return merge(
        state,
        { collection: toObject(action.payload) },
        { ui: { findPosts: { busy: false } } }
      );

    case FIND_POSTS_FAILED:
      return merge(state, {
        ui: { findPosts: { busy: false, errorMessage: action.payload } }
      });

    case GET_POST_STARTED:
      return merge(state, {
        ui: { getPost: { busy: true, errorMessage: undefined } }
      });

    case GET_POST_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { getPost: { busy: false } } }
      );

    case GET_POST_FAILED:
      return merge(state, {
        ui: { getPost: { busy: false, errorMessage: action.payload } }
      });

    default:
      return state;
  }
};

export default reducer;
