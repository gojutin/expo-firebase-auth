import firebase from 'firebase';
import 'firebase/auth';

export const {auth} = firebase;

export { storage, uploadFile, deleteFile } from "./storage/storage.api";
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
  getCreatedStamp,
} from "./db/db.api";
