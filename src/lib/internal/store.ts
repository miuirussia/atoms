type Action<T, P> = {
  type: T,
  payload?: P,
};

type Listener<T, A> = (state: T, action: A) => void;

type Reducer<T, A> = (state: T, action: A) => T;

type Store<T, A> = Readonly<{
  dispatch: (action: A) => void,
  subscribe: (listener: Listener<T, A>) => void,
  getState: () => T,
}>;

export const createStore = <T, A extends Action<any, any>>(reducer: Reducer<T, A>): Store<T, A> => {
  let currentState: T;
  let listeners: Array<Listener<T, A>> = [];

  const getState = () => currentState;

  const subscribe = (listener: Listener<T, A>) => {
    listeners.push(listener);
  };

  const dispatch = (action: A): void => {
    currentState = reducer(currentState, action);
    listeners.forEach(l => l(currentState, action));
  };

  dispatch({ type: '__INIT__' } as A);

  return {
    dispatch,
    subscribe,
    getState,
  }
};
