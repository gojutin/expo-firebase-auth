import * as firebase from 'firebase/app';
import 'firebase/storage';

const { storage } = firebase;

function uploadFile(storageRef, blob, callback) {
  return new Promise((resolve, reject) => {
    const task = storageRef.put(blob.file ? blob.file : blob);

    task.on(
      'state_changed',
      snapshot => {
        const { bytesTransferred, totalBytes } = snapshot;
        const percentComplete = (bytesTransferred / totalBytes) * 100;
        const progressPercentage = Math.ceil(percentComplete);
        return callback && callback(progressPercentage);
      },

      error => {
        Notification.error({
          title: 'Oops...something went wrong.',
          message: error.message,
        });
      },
      () => {
        task.snapshot.ref
          .getDownloadURL()
          .then(url => {
            resolve(url);
          })
          .catch(error => {
            reject(error);
          });
      },
    );
  });
}

function deleteFile(ref) {
  return ref.delete();
}

export { storage, uploadFile, deleteFile };
