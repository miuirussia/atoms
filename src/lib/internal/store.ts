export type Action<T, P = void> = {
  type: T,
  payload?: P,
};

type Listener<T, A> = (action: A, state: T) => void;

type Reducer<T, A> = (state: T, action: A) => T;

type Store<T, A> = Readonly<{
  dispatch: (action: A) => void,
  subscribe: (listener: Listener<T, A>) => void,
  getState: () => T,
}>;

const INIT_ACTION = Symbol('__INIT__');

export const createStore = <T, A extends Action<any, any>>(reducer: Reducer<T, A>): Store<T, A> => {
  let currentState: T;
  let listeners: Array<Listener<T, A>> = [];

  const getState = () => currentState;

  const subscribe = (listener: Listener<T, A>) => {
    listeners.push(listener);
  };

  const dispatch = (action: A): void => {
    currentState = reducer(currentState, action);
    listeners.forEach(l => l(action, currentState));
  };

  dispatch({ type: INIT_ACTION } as A);

  return {
    dispatch,
    subscribe,
    getState,
  }
};
