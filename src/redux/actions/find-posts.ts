import { ThunkAction } from "redux-thunk";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";
import { PostModel } from "../../models";

export const FIND_POSTS_STARTED = "FIND_POSTS_STARTED";
export const FIND_POSTS_SUCCEEDED = "FIND_POSTS_SUCCEEDED";
export const FIND_POSTS_FAILED = "FIND_POSTS_FAILED";

type FindPostsStartedAction = {
  type: typeof FIND_POSTS_STARTED;
};

type FindPostsSucceededAction = {
  type: typeof FIND_POSTS_SUCCEEDED;
  payload: Array<PostModel>;
};

type FindPostsFailedAction = {
  type: typeof FIND_POSTS_FAILED;
  payload: string;
};

const findPostsStarted = (): FindPostsStartedAction => ({
  type: FIND_POSTS_STARTED
});

const findPostsSucceeded = (
  posts: Array<PostModel>
): FindPostsSucceededAction => ({
  type: FIND_POSTS_SUCCEEDED,
  payload: posts
});

const findPostsFailed = (error: Error): FindPostsFailedAction => ({
  type: FIND_POSTS_FAILED,
  payload: error.message
});

export type FindPostsActions =
  | FindPostsStartedAction
  | FindPostsSucceededAction
  | FindPostsFailedAction;

export const findPosts = (): ThunkAction<
  void,
  AppState,
  null,
  FindPostsActions
> => async dispatch => {
  dispatch(findPostsStarted());

  try {
    const snapshot = await firebase
      .firestore()
      .collection("posts")
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    const posts = snapshot.docs.map<PostModel>(toPlainObject);

    for (const post of posts) {
      post.fileUrl = await firebase
        .storage()
        .ref(`/posts/${post.id}`)
        .child(post.fileName)
        .getDownloadURL();
    }

    dispatch(findPostsSucceeded(posts));
  } catch (error) {
    dispatch(findPostsFailed(error));
  }
};
