import { ThunkAction } from "redux-thunk";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";
import { PostModel } from "../../models";
import history from "../../history";

export const DELETE_POST_STARTED = "DELETE_POST_STARTED";
export const DELETE_POST_SUCCEEDED = "DELETE_POST_SUCCEEDED";
export const DELETE_POST_FAILED = "DELETE_POST_FAILED";

type DeletePostStartedAction = {
  type: typeof DELETE_POST_STARTED;
  payload: { id: string };
};

type DeletePostSucceededAction = {
  type: typeof DELETE_POST_SUCCEEDED;
  payload: { id: string };
};

type DeletePostFailedAction = {
  type: typeof DELETE_POST_FAILED;
  payload: string;
};

const deletePostStarted = (id: string): DeletePostStartedAction => ({
  type: DELETE_POST_STARTED,
  payload: { id }
});

const deletePostSucceeded = (id: string): DeletePostSucceededAction => ({
  type: DELETE_POST_SUCCEEDED,
  payload: { id }
});

const deletePostFailed = (error: Error): DeletePostFailedAction => ({
  type: DELETE_POST_FAILED,
  payload: error.message
});

export type DeletePostActions =
  | DeletePostStartedAction
  | DeletePostSucceededAction
  | DeletePostFailedAction;

export const deletePost = (
  id: string
): ThunkAction<void, AppState, null, DeletePostActions> => async dispatch => {
  dispatch(deletePostStarted(id));

  try {
    const docRef = firebase
      .firestore()
      .collection("posts")
      .doc(id);
    const snapshot = await docRef.get();
    const post = toPlainObject<PostModel>(snapshot);

    await docRef.delete();
    await firebase
      .storage()
      .ref(`/posts/${post.id}`)
      .child(post.fileName)
      .delete();

    dispatch(deletePostSucceeded(id));
    history.push("/");
  } catch (error) {
    dispatch(deletePostFailed(error));
  }
};
