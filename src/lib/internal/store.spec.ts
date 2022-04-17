import { Action, createStore } from './store';

type State = { dontTouchVar: boolean, count: number }
type Actions = Action<'up'> | Action<'down'> | Action<'toggle'>;

describe('Store', () => {
  const store = createStore((state: State = { dontTouchVar: true, count: 0 }, action: Actions) => {
    switch (action.type) {
      case 'up':
        return { ...state, count: state.count + 1 };
      case 'down':
        return { ...state, count: state.count - 1 };
      case 'toggle':
        return { ...state, dontTouchVar: !state.dontTouchVar };
      default:
        return state;
    }
  });

  it('getState', () => {
    expect(store.getState()).toEqual({ dontTouchVar: true, count: 0 });
  })

  it('dispatch', () => {
    store.dispatch({ type: 'up' });
    expect(store.getState()).toEqual({ dontTouchVar: true, count: 1 });
    store.dispatch({ type: 'down' });
    expect(store.getState()).toEqual({ dontTouchVar: true, count: 0 });
    store.dispatch({ type: 'toggle' });
    expect(store.getState()).toEqual({ dontTouchVar: false, count: 0 });
    store.dispatch({ type: 'toggle' });
    expect(store.getState()).toEqual({ dontTouchVar: true, count: 0 });
  });

  it('subscribe', () => {
    const listener = jest.fn();
    store.subscribe(listener);
    store.dispatch({ type: 'up' });
    expect(listener.mock.calls).toEqual([[{ type: 'up' }, { dontTouchVar: true, count: 1 }]]);
    store.dispatch({ type: 'down' });
    expect(listener.mock.calls).toEqual([[{ type: 'up' }, { dontTouchVar: true, count: 1 }], [{ type: 'down' }, { dontTouchVar: true, count: 0 }]]);
  });
});
