import { ThunkAction } from "redux-thunk";
import { PostModel } from "../../models";
import firebase, { toPlainObject } from "../../firebase";
import { AppState } from "../state";
import history from "../../history";

export const CREATE_POST_STARTED = "CREATE_POST_STARTED";
export const CREATE_POST_SUCCEEDED = "CREATE_POST_SUCCEEDED";
export const CREATE_POST_FAILED = "CREATE_POST_FAILED";

type CreatePostStartedAction = {
  type: typeof CREATE_POST_STARTED;
  payload: {
    caption: string;
    fileContent: string;
    fileName: string;
  };
};

type CreatePostSucceededAction = {
  type: typeof CREATE_POST_SUCCEEDED;
  payload: PostModel;
};

type CreatePostFailedAction = {
  type: typeof CREATE_POST_FAILED;
  payload: string;
};

const createPostStarted = (
  caption: string,
  fileContent: string,
  fileName: string
): CreatePostStartedAction => ({
  type: CREATE_POST_STARTED,
  payload: { caption, fileContent, fileName }
});

const createPostSucceeded = (post: PostModel): CreatePostSucceededAction => ({
  type: CREATE_POST_SUCCEEDED,
  payload: post
});

const createPostFailed = (error: Error): CreatePostFailedAction => ({
  type: CREATE_POST_FAILED,
  payload: error.message
});

export type CreatePostActions =
  | CreatePostStartedAction
  | CreatePostSucceededAction
  | CreatePostFailedAction;

export const createPost = (
  caption: string,
  fileContent: string,
  fileName: string
): ThunkAction<void, AppState, null, CreatePostActions> => async (
  dispatch,
  getState
) => {
  const { displayName: name, uid } = getState().auth.currentUser!;

  dispatch(createPostStarted(caption, fileContent, fileName));

  try {
    const docRef = await firebase
      .firestore()
      .collection("posts")
      .add({
        caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        fileName,
        owner: { name, uid },
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    const snapshot = await docRef.get();
    const post = toPlainObject<PostModel>(snapshot);
    const storageRef = firebase
      .storage()
      .ref(`/posts/${docRef.id}`)
      .child(fileName);

    await storageRef.putString(fileContent, "data_url");

    dispatch(createPostSucceeded(post));
    history.push(`/posts/${post.id}`);
  } catch (error) {
    dispatch(createPostFailed(error));
  }
};
