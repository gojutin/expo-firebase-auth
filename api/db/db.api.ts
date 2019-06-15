import * as firebase from "firebase";
import "firebase/firestore";
import { auth } from "../../Auth/api";

const db = firebase.firestore();

/*
* ***UTILITY FUNCTIONS***
* The following stamps are injected into every db create, update and delete methods.
* getCreatedStamp   - returns an object with timestamp and current user id.
* getModifiedStamp  - returns an object with timestamp and current user id.

* getDocData        - returns data retrieved from a DocumentQuery.
* getListData       - returns data retrieved from a QuerySnapshot
* handleAsync       - a wrapper for all db methods that handles error notifications.
* deleteField       -
*/

function getCreatedStamp() {
  if (!auth().currentUser) {
    return {
      created_at: new Date()
    };
  }
  const userId = auth().currentUser.uid;
  return {
    created_at: firebase.firestore.FieldValue.serverTimestamp(),
    created_by: userId
  };
}

function getModifiedStamp() {
  const userId = auth().currentUser.uid;
  return {
    last_modified_at: firebase.firestore.FieldValue.serverTimestamp(),
    last_modified_by: userId
  };
}

function getDocData(result) {
  if (!result.exists) {
    return null;
  }
  return result.data();
}

function getListData(result) {
  if (result.empty) {
    return [];
  }
  const data = [];
  result.forEach(doc => {
    // * doc.data() is never undefined for query doc snapshots
    data.push(doc.data());
  });
  return data;
}

function deleteField() {
  return firebase.firestore.FieldValue.delete();
}

function handleAsync(callback) {
  return callback.catch(error => {
    // Notification.error({
    //   title: "Oops...something went wrong.",
    //   message: error.message
    // });
  });
}

/*
  S ubscribe
  C reate
  R ead
  U pdate
  D elete
*/

/*
 * ***CREATE UPDATE DELETE***
 * create    - creates a new document or fail if that document already exists.
 * set       - replaces ALL fields in the document or creates it if it doesn't exist.
 * setMerge  - updates fields in a document or creates it if it doesn't exist.
 * update    - updates fields in the document or fail if that document does not exist.
 * commitBatch
 * _delete
 */
function create(ref, values) {
  const callback = ref.set({ ...values, ...getCreatedStamp() });
  return handleAsync(callback);
}

function set(ref, values) {
  const callback = ref.set({ ...values, ...getModifiedStamp() });
  return handleAsync(callback);
}

function setMerge(ref, values) {
  const callback = ref.set(
    { ...values, ...getModifiedStamp() },
    { merge: true }
  );
  return handleAsync(callback);
}

function update(ref, values) {
  const callback = ref.set(
    { ...values, ...getModifiedStamp() },
    { merge: true }
  );
  return handleAsync(callback);
}

function commitBatch(batch) {
  return handleAsync(batch.commit());
}

function _delete(ref) {
  return handleAsync(ref.delete());
}

/*
 * ***READ***
 * get  - The get method will return either
 * 1. QuerySnapshot for lists
 * 2. DocumentSnapshot for documents
 * The QuerySnapshot has a 'docs' property (array), which is used to determine
 * if a document or list was retrieved.
 */

async function get(ref) {
  try {
    const result = await ref.get();
    if (result.docs) {
      // * This is a list
      return getListData(result);
    }
    // * This is a document
    return getDocData(result);
  } catch (error) {
    // Notification.error({
    //   title: "Oops...",
    //   message: error.message
    // });
  }
}

/*
 * ***READ***
 * subscribe  - Creates a real-time connection to a document or list.
 * ARGUMENTS:
 * 1. ref       - This is the db ref to the doc or list to be subscribed to.
 * 2. callback  - The values are passed to the callback anytime the subscription
 *                returns new values.
 *
 * This methods also returns a promise, which resolves with the data.
 * This is used in the handleInitialFetch method in App.vue
 *
 * The subscribe method will return either:
 * 1. QuerySnapshot for lists
 * 2. DocumentSnapshot for documents
 * The QuerySnapshot has a 'docs' property (array), which is used to determine
 * if a document or list was retrieved.
 */

function subscribe(ref, callback) {
  return new Promise(resolve => {
  return ref.onSnapshot(result => {
    let data;
    if (result.docs) {
      data = getListData(result);
    } else {
      data = getDocData(result);
    }
    resolve(data);
    return callback(data);
  });
  });
}

export {
  db,
  create,
  set,
  setMerge,
  update,
  commitBatch,
  _delete,
  get,
  subscribe,
  deleteField,
  getCreatedStamp
};
