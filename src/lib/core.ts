import { produce } from 'immer';

import { Action, createStore as createStateStore } from './internal/store';

import type { Awaited, Atom, OnUnmount, Void, WritableAtom } from './atom';

type AnyAtomValue = unknown;
type AnyAtom = Atom<AnyAtomValue>;
type AnyWritableAtom = WritableAtom<AnyAtomValue, unknown, Void>;

const hasInitialValue = <T extends AnyAtom>(atom: T): atom is T & (T extends Atom<infer V> ? { init: V } : never) => 'init' in atom;

const isWritableAtom = (atom: AnyAtom): atom is AnyWritableAtom => !!(atom as AnyWritableAtom).write;

type ReadError = unknown;
type Revision = number;
type ReadDependencies = Map<AnyAtom, Revision>;

export type AtomState<V = AnyAtomValue> = {
  r: Revision,
  d: ReadDependencies,
} & ({ e: ReadError } | { p: Promise<V> } | { v: Awaited<V> });

type Dependents = Set<AnyAtom>;

type Mounted = {
  t: Dependents,
  u?: OnUnmount,
};

type State = Readonly<{
  stateMap: WeakMap<AnyAtom, AtomState>,
  mountedMap: WeakMap<AnyAtom, Mounted>,
}>;

type Actions = Action<'mount', { atom: AnyWritableAtom }> | Action<'unmount'> | Action<'pending'> | Action<'error'> | Action<'resolve'>;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'mount': {
      return produce(state, draft => {

      });
    }
    case 'unmount':
    case 'pending':
    case 'error':
    case 'resolve':
    default:
      return state;
  }
};


export const createStore = (initialValues?: Iterable<readonly [AnyAtom, AnyAtomValue]>) => {
};
