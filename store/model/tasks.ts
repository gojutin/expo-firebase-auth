import { Action, action, thunk, Thunk, selector , Selector} from "easy-peasy";
import { db, auth, create, subscribe, setMerge } from "../../api";

interface Task {
  id: string;
  isCompleted?: boolean;
  body?: string;
  value?: string;
  complete?: boolean;
  dueDate?: string;
}

export interface TasksModel {
  allInProgressTasks: Task[];
  allCompletedTasks: Task[];
  allTasks: Selector<Task[]>;
  subscribeToInProgressTasks: Thunk<TasksModel>;
  subscribeToCompletedTasks: Thunk<TasksModel>;
  updateAllInProgressTasks: Action<TasksModel, Task[]>;
  updateAllCompletedTasks: Action<TasksModel, Task[]>;
  addTask: Thunk<TasksModel, any>;
  toggleTaskCompleted: Thunk<TasksModel, any>;
}

const todos: TasksModel = {
  allInProgressTasks: [],
  allCompletedTasks: [],
  allTasks: selector(
    [(state: TasksModel) => state.allInProgressTasks, (state: TasksModel) => state.allCompletedTasks],
    (resolvedState) => {
      const [tasks, tasks2] = resolvedState;
      const final = [...tasks, ...tasks2]
      return final;
    }
  ),
  subscribeToInProgressTasks: thunk(actions => {
    const callback = (data: Task[]) => {
      actions.updateAllInProgressTasks(data);
    };
    const userId = auth().currentUser.uid;
    const ref = db
      .collection("tasks")
      .where(`access.${userId}`, "==", true)
      .where("completed", "==", false);
    return subscribe(ref, callback);
  }),
  subscribeToCompletedTasks: thunk(actions => {
    const callback = (data: Task[]) => {
      actions.updateAllCompletedTasks(data);
    };
    const userId = auth().currentUser.uid;
    const ref = db
      .collection("tasks")
      .where(`access.${userId}`, "==", true)
      .where("completed", "==", true);
    return subscribe(ref, callback);
  }),

  updateAllInProgressTasks: action((state, payload: any) => {
    state.allInProgressTasks = payload;
  }),
  updateAllCompletedTasks: action((state, payload: any) => {
    state.allCompletedTasks = payload;
  }),

  addTask: thunk((actions, payload) => {
    const userId = auth().currentUser.uid;
    const newTask = db.collection("tasks").doc();

    return create(newTask, {
      id: newTask.id,
      completed: false,
      access: {
        [`${userId}`]: true
      },
      ...payload
    });
  }),
  toggleTaskCompleted: thunk((actions, { id, currentState }) => {
    const ref = db.collection("tasks").doc(id);

    return setMerge(ref, {
      completed: !currentState
    });
  })
};

export default todos;
