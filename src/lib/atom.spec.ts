import { describe, test, expect, vi } from 'vitest';

import { primitiveAtom } from './atom';
import { unsafeCoerce } from './utils';

describe('Atom', () => {
  test('primitiveAtom', () => {
    const testAtom = primitiveAtom(0);

    const getter = vi.fn(atom => atom.init);

    expect(testAtom).toMatchSnapshot();
    expect(testAtom.init).toBe(0);

    expect(testAtom.read(getter)).toBe(0);
    expect(getter.mock.calls.length).toBe(1);

    const setter = vi.fn((atom, nextValue) => {
      expect(atom).toBe(testAtom);
      expect(nextValue).toBe(3);
    });
    expect(testAtom.write(getter, unsafeCoerce(setter), 3));
  });
  test('atom', () => {
    
  });
  test('readOnlyAtom', () => {});
  test('writeOnlyAtom', () => {});
});