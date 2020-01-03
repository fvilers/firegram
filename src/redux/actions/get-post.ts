import { ThunkAction } from "redux-thunk";
import { PostModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";

export const GET_POST_STARTED = "GET_POST_STARTED";
export const GET_POST_SUCCEEDED = "GET_POST_SUCCEEDED";
export const GET_POST_FAILED = "GET_POST_FAILED";

type GetPostStartedAction = {
  type: typeof GET_POST_STARTED;
  payload: { id: string };
};

type GetPostSucceededAction = {
  type: typeof GET_POST_SUCCEEDED;
  payload: PostModel;
};

type GetPostFailedAction = {
  type: typeof GET_POST_FAILED;
  payload: string;
};

const getPostStarted = (id: string): GetPostStartedAction => ({
  type: GET_POST_STARTED,
  payload: { id }
});

const getPostSucceeded = (post: PostModel): GetPostSucceededAction => ({
  type: GET_POST_SUCCEEDED,
  payload: post
});

const getPostFailed = (error: Error): GetPostFailedAction => ({
  type: GET_POST_FAILED,
  payload: error.message
});

export type GetPostActions =
  | GetPostStartedAction
  | GetPostSucceededAction
  | GetPostFailedAction;

export const getPost = (
  id: string
): ThunkAction<void, AppState, null, GetPostActions> => async dispatch => {
  dispatch(getPostStarted(id));

  try {
    const snapshot = await firebase
      .firestore()
      .collection("posts")
      .doc(id)
      .get();

    if (!snapshot.exists) {
      throw new Error("Post not found");
    }

    const post = toPlainObject<PostModel>(snapshot);
    post.fileUrl = await firebase
      .storage()
      .ref(`/posts/${id}`)
      .child(post.fileName)
      .getDownloadURL();

    dispatch(getPostSucceeded(post));
  } catch (error) {
    dispatch(getPostFailed(error));
  }
};
