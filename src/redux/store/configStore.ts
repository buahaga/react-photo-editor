import { createStore } from 'redux';
import { rootReducer } from '../reducers/rootReducer';

export function configStore() {
  return createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__  && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
}
