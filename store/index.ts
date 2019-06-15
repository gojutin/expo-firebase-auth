import { createStore } from 'easy-peasy';
import model from './model';

const store = createStore(model);
const { useStoreActions, useStoreDispatch, useStoreState } = store;

// We export the hooks from our store as they will contain the
// type information on them
export { useStoreActions, useStoreDispatch, useStoreState };

export default store;