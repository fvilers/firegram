import { ThunkAction } from "redux-thunk";
import { PostModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";

export const LIKE_POST_STARTED = "LIKE_POST_STARTED";
export const LIKE_POST_SUCCEEDED = "LIKE_POST_SUCCEEDED";
export const LIKE_POST_FAILED = "LIKE_POST_FAILED";

type LikePostStartedAction = {
  type: typeof LIKE_POST_STARTED;
  payload: { id: string };
};

type LikePostSucceededAction = {
  type: typeof LIKE_POST_SUCCEEDED;
  payload: PostModel;
};

type LikePostFailedAction = {
  type: typeof LIKE_POST_FAILED;
  payload: string;
};

const likePostStarted = (id: string): LikePostStartedAction => ({
  type: LIKE_POST_STARTED,
  payload: { id }
});

const likePostSucceeded = (post: PostModel): LikePostSucceededAction => ({
  type: LIKE_POST_SUCCEEDED,
  payload: post
});

const likePostFailed = (error: Error): LikePostFailedAction => ({
  type: LIKE_POST_FAILED,
  payload: error.message
});

export type LikePostActions =
  | LikePostStartedAction
  | LikePostSucceededAction
  | LikePostFailedAction;

export const likePost = (
  id: string
): ThunkAction<void, AppState, null, LikePostActions> => async (
  dispatch,
  getState
) => {
  const { uid } = getState().auth.currentUser!;
  dispatch(likePostStarted(id));

  try {
    const docRef = firebase
      .firestore()
      .collection("posts")
      .doc(id);
    await docRef.update({ [`likes.${uid}`]: true });

    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      throw new Error("Post not found");
    }

    const post = toPlainObject<PostModel>(snapshot);

    dispatch(likePostSucceeded(post));
  } catch (error) {
    dispatch(likePostFailed(error));
  }
};
