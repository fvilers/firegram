import { PostState } from "../state";
import {
  CreatePostActions,
  CREATE_POST_STARTED,
  CREATE_POST_SUCCEEDED,
  CREATE_POST_FAILED
} from "../actions/create-post";
import {
  DeletePostActions,
  DELETE_POST_STARTED,
  DELETE_POST_SUCCEEDED,
  DELETE_POST_FAILED
} from "../actions/delete-post";
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
import {
  LikePostActions,
  LIKE_POST_STARTED,
  LIKE_POST_SUCCEEDED,
  LIKE_POST_FAILED
} from "../actions/like-post";
import {
  UnlikePostActions,
  UNLIKE_POST_STARTED,
  UNLIKE_POST_SUCCEEDED,
  UNLIKE_POST_FAILED
} from "../actions/unlike-post";
import { merge, toObject } from "../helpers";

const INITIAL_STATE: PostState = {
  collection: {},
  ui: {
    createPost: { busy: false },
    deletePost: { busy: false },
    findPosts: { busy: false },
    getPost: { busy: false },
    likePost: { busy: false },
    unlikePost: { busy: false }
  }
};

type SupportedActions =
  | CreatePostActions
  | DeletePostActions
  | FindPostsActions
  | GetPostActions
  | LikePostActions
  | UnlikePostActions;

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

    case DELETE_POST_STARTED:
      return merge(state, {
        ui: { deletePost: { busy: true, errorMessage: undefined } }
      });

    case DELETE_POST_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: undefined } },
        { ui: { deletePost: { busy: false } } }
      );

    case DELETE_POST_FAILED:
      return merge(state, {
        ui: { deletePost: { busy: false, errorMessage: action.payload } }
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

    case LIKE_POST_STARTED:
      return merge(state, {
        ui: { likePost: { busy: true, errorMessage: undefined } }
      });

    case LIKE_POST_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { likePost: { busy: false } } }
      );

    case LIKE_POST_FAILED:
      return merge(state, {
        ui: { likePost: { busy: false, errorMessage: action.payload } }
      });

    case UNLIKE_POST_STARTED:
      return merge(state, {
        ui: { unlikePost: { busy: true, errorMessage: undefined } }
      });

    case UNLIKE_POST_SUCCEEDED:
      return merge(
        state,
        { collection: { [action.payload.id]: action.payload } },
        { ui: { unlikePost: { busy: false } } }
      );

    case UNLIKE_POST_FAILED:
      return merge(state, {
        ui: { unlikePost: { busy: false, errorMessage: action.payload } }
      });

    default:
      return state;
  }
};

export default reducer;
