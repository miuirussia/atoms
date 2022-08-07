import { Atom, WritableAtom } from '@lib/atom';

type AnyAtomValue = unknown;
type AnyAtom = Atom<AnyAtomValue>;
type AnyWritableAtom = WritableAtom<AnyAtomValue, unknown, void | Promise<void>>;

type Store = Readonly<{}>;

type Revision = number;
type Dependents = Set<AnyAtom>;
type ReadDependents = Map<AnyAtom, Revision>;
type ReadError = unknown;

type MountState = Readonly<{
  dependents: Dependents,
  unmount?: () => void,
}>;

type AtomState<V = AnyAtomValue> = Readonly<{
  revision: Revision,
  dependents: ReadDependents,
} & ({ error: ReadError } | { promise: Promise<unknown> } | { value: Awaited<V> })>;

const hasInitialValue = <T extends AnyAtom>(atom: T): atom is T & (T extends Atom<infer V> ? { init: V } : never) => 'init' in atom;

export const createStore = (initial?: Iterable<readonly [AnyAtom, AnyAtomValue]>): Store => {
  const mountedMap = new Map<AnyAtom, MountState>;
  const stateMap = new WeakMap<AnyAtom, AtomState>;

  const mountAtom = (atom: AnyAtom): void => {

  };

  const readAtom = <V>(atom: Atom<V>): V => {

  };

  const writeAtom = <V, P>(atom: WritableAtom<V, P>): void => {

  }

  const unmountAtom = (atom: AnyAtom): void => {
  };

  return {
    mountAtom,
    readAtom,
    writeAtom,
    unmountAtom,
  };
};
