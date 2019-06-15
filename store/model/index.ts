import tasks, { TasksModel } from './tasks';

export interface StoreModel {
  tasks: TasksModel;
  // notification: NotificationModel;
}

const model: StoreModel = {
  tasks,
  // notification,
};

export default model;