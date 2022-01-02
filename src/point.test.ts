import { Point } from './point';

describe('point', () => {
  it('should have x,y properties', () => {
    const p = new Point(1, 1);
    expect(p.x).toBe(1);
    expect(p.y).toBe(1);
  });

  it('should add', () => {
    const p = new Point(1, 1);
    const q = new Point(3, 4);
    const res = p.add(q);
    expect(res.x).toBe(4);
    expect(res.y).toBe(5);
  });

  it('should sub', () => {
    const p = new Point(1, 1);
    const q = new Point(3, 4);
    const res = p.sub(q);
    expect(res.x).toBe(-2);
    expect(res.y).toBe(-3);
  });

  it('should mul', () => {
    const p = new Point(2, 5);
    const q = new Point(3, 4);
    const res = p.mul(q);
    expect(res.x).toBe(6);
    expect(res.y).toBe(20);
  });

  it('should div', () => {
    const p = new Point(10, 5);
    const q = new Point(2, 5);
    const res = p.div(q);
    expect(res.x).toBe(5);
    expect(res.y).toBe(1);
  });

  it('should floor', () => {
    const p = new Point(10.4, 5.6);
    const res = p.floor();
    expect(res.x).toBe(10);
    expect(res.y).toBe(5);
  });
});
