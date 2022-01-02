import { rad } from './utils';

describe('rad', () => {
  it('should convert to radian', () => {
    expect(rad(0)).toBe(0);
    expect(rad(1)).toBe(0.017453292519943295);
    expect(rad(45)).toBe(Math.PI / 4);
    expect(rad(90)).toBe(Math.PI / 2);
    expect(rad(180)).toBe(Math.PI);
  });
});
