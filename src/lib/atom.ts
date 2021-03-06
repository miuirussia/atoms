import { SetStateAction } from "react";

export type Void = void | Promise<void>;
export type Awaited<T> = T extends Promise<infer V> ? Awaited<V> : T;

export type Atom<V> = {
  toString: () => string,
  debugLabel?: string,
  read: Read<V>,
};

export type WritableAtom<V, U, R extends Void = void> = Atom<V> & {
  write: Write<U, R>,
  onMount?: OnMount<U, R>,
};

export type PrimitiveAtom<V> = WritableAtom<V, SetStateAction<V>>;

type Read<V> = (get: Getter) => V;

type Write<U, R extends Void> = (get: Getter, set: Setter, update: U) => R;

type WithInitialValue<V> = {
  init: V,
};

type Getter = {
  <V>(atom: Atom<V | Promise<V>>): V;
  <V>(atom: Atom<Promise<V>>): V;
  <V>(atom: Atom<V>): Awaited<V>;
};

type Setter = {
  <V, R extends Void>(atom: WritableAtom<V, undefined, R>): R;
  <V, U, R extends Void>(atom: WritableAtom<V, U, R>, update: U): R;
};

type OnMount<U, R extends Void> = <S extends SetAtom<U, R>>(set: S) => OnUnmount | void;
export type OnUnmount = () => void;

type SetAtom<U, R extends Void> = undefined extends U ? (update?: U) => R : (update: U) => R;

let keyCount = 0;

// writable atom
export function atom<V, U, R extends Void = void>(read: Read<V>, write: Write<U, R>): WritableAtom<V, U, R>;

// read-only atom
export function atom<V>(read: Read<V>): Atom<V>;

// never atom (default if not match any other)
export function atom(invalidFunction: (...args: any) => any, write?: any): never;

// write-only atom
export function atom<V, U, R extends Void = void>(initialValue: V, write: Write<U, R>): WritableAtom<V, U, R> & WithInitialValue<V>;

export function atom<V>(initialValue: V): PrimitiveAtom<V> & WithInitialValue<V>;

export function atom<V, U, R extends Void>(read: V | Read<V>, write?: Write<U, R>) {
  const key = `atom${++keyCount}`;

  const config = {
    toString: () => key,
  } as WritableAtom<V, U, R> & { init?: V };

  if (typeof read === 'function') {
    config.read = read as Read<V>;
  } else {
    config.init = read;
    config.read = get => get(config);
    config.write = (get, set, update) => set(config, typeof update === 'function' ? update(get(config)) : update);
  }

  if (write) {
    config.write = write;
  }

  return config;
}
