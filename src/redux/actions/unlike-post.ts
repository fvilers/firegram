import { ThunkAction } from "redux-thunk";
import { PostModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";

export const UNLIKE_POST_STARTED = "UNLIKE_POST_STARTED";
export const UNLIKE_POST_SUCCEEDED = "UNLIKE_POST_SUCCEEDED";
export const UNLIKE_POST_FAILED = "UNLIKE_POST_FAILED";

type UnlikePostStartedAction = {
  type: typeof UNLIKE_POST_STARTED;
  payload: { id: string };
};

type UnlikePostSucceededAction = {
  type: typeof UNLIKE_POST_SUCCEEDED;
  payload: PostModel;
};

type UnlikePostFailedAction = {
  type: typeof UNLIKE_POST_FAILED;
  payload: string;
};

const unlikePostStarted = (id: string): UnlikePostStartedAction => ({
  type: UNLIKE_POST_STARTED,
  payload: { id }
});

const unlikePostSucceeded = (post: PostModel): UnlikePostSucceededAction => ({
  type: UNLIKE_POST_SUCCEEDED,
  payload: post
});

const unlikePostFailed = (error: Error): UnlikePostFailedAction => ({
  type: UNLIKE_POST_FAILED,
  payload: error.message
});

export type UnlikePostActions =
  | UnlikePostStartedAction
  | UnlikePostSucceededAction
  | UnlikePostFailedAction;

export const unlikePost = (
  id: string
): ThunkAction<void, AppState, null, UnlikePostActions> => async (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.currentUser!;
  dispatch(unlikePostStarted(id));

  try {
    const docRef = firebase
      .firestore()
      .collection("posts")
      .doc(id);
    await docRef.update({ [`likes.${uid}`]: false });

    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error("Post not found");
    }

    const post = toPlainObject<PostModel>(snapshot);

    dispatch(unlikePostSucceeded(post));
  } catch (error) {
    dispatch(unlikePostFailed(error));
  }
};
