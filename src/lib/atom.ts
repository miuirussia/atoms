// from react types
type SetStateAction<V> = V | ((prev: V) => V);

type Getter = <V>(atom: Atom<V>) => V
type Setter = <V, U, R extends void | Promise<void>>(atom: WritableAtom<V, U, R>, update: U) => R;

type UnmountListener = () => void;
type MountListener<U, R> = (setAtom: (update: U) => R) => UnmountListener | void;

type Read<V> = (get: Getter) => V | Promise<V>;
type Write<U, R extends void | Promise<void> = void> = (get: Getter, set: Setter, update: U) => R;
type WithInitialValue<V> = { init: V };

export interface Atom<V> {
  toString: () => string,
  debugLabel?: string,
  read: Read<V>,
}

export interface WritableAtom<V, U, R extends void | Promise<void> = void> extends Atom<V> {
  write: Write<U, R>,
  onMount?: MountListener<U, R>,
}

export type PrimitiveAtom<V> = WritableAtom<V, SetStateAction<V>>;

export function primitiveAtom<V>(initialValue: V): PrimitiveAtom<V> & WithInitialValue<V> {
  return createAtom(initialValue) as PrimitiveAtom<V> & WithInitialValue<V>;
};

export function atom<V, U, R extends void | Promise<void> = void>(read: Read<V>, write: Write<U, R>): WritableAtom<V, U, R> {
  return createAtom(read, write);
}

export function readOnlyAtom<V>(read: Read<V>): Atom<V> {
  return createAtom(read);
};

export function writeOnlyAtom<U, R extends void | Promise<void>>(write: Write<U, R>): WritableAtom<null, U, R> & WithInitialValue<null> {
  return createAtom(null, write) as WritableAtom<null, U, R> & WithInitialValue<null>;
}

let keyCount: number = 0;

function createAtom<V, U, R extends void | Promise<void>>(read: V | Read<V>, write?: Write<U, R>) {
  const key = `atom${++keyCount}`;

  const spec = {
    toString: () => key,
  } as WritableAtom<V, U, R> & { init?: V };

  if (typeof read === 'function') {
    spec.read = read as Read<V>;
  } else {
    spec.init = read;
    spec.read = get => get(spec);
    spec.write = (get, set, update) => set(spec, typeof update === 'function' ? update(get(spec)) : update);
  }

  if (write) {
    spec.write = write;
  }

  return spec;
}
