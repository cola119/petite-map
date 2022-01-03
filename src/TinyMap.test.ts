import { Point } from './point';
import { createCompleteTileUrl, createTileGrid, TinyMap } from './TinyMap';

describe('TinyMap', () => {
  it('should throw an error if a map container is missing', () => {
    document.body.innerHTML = ``;
    expect(
      () => new TinyMap('map', { center: { lat: 0, lng: 0 } })
    ).toThrowError('map container is missing');
  });
});

describe('createCompleteTileUrl', () => {
  it('should replace placeholders', () => {
    expect(
      createCompleteTileUrl('https://hoge.com/{x}/{y}/{z}', {
        x: 1,
        y: 2,
        z: 3,
      })
    ).toBe('https://hoge.com/1/2/3');
  });
});

describe('createTileGrid', () => {
  it('should return 2*3 grid', () => {
    const center = new Point(10, 10);
    // prettier-ignore
    expect(createTileGrid(center, 0, 2, 0, 3, 100)).toStrictEqual([
      [center,            new Point(11, 10)],
      [new Point(10, 11), new Point(11, 11)],
      [new Point(10, 12), new Point(11, 12)],
    ]);
  });
  it('should return 4*5 grid', () => {
    const center = new Point(10, 10);
    // prettier-ignore
    expect(createTileGrid(center, 2, 2, 2, 3, 100)).toStrictEqual([
      [new Point(8, 8),  new Point(9, 8),  new Point(10, 8),  new Point(11, 8)],
      [new Point(8, 9),  new Point(9, 9),  new Point(10, 9),  new Point(11, 9)],
      [new Point(8, 10), new Point(9, 10), center,            new Point(11, 10)],
      [new Point(8, 11), new Point(9, 11), new Point(10, 11), new Point(11, 11)],
      [new Point(8, 12), new Point(9, 12), new Point(10, 12), new Point(11, 12)],
    ]);
  });
  it('should adjust grid coord if it is greater than maxTileNum', () => {
    const center = new Point(10, 10);
    // ...9,10,11,12... (max: 11)
    // ...9,10,0,1... (max: 11)
    // prettier-ignore
    expect(createTileGrid(center, 2, 3, 2, 3, 11)).toStrictEqual([
      [new Point(8, 8),  new Point(9, 8),  new Point(10, 8), new Point(0, 8),  new Point(1, 8)],
      [new Point(8, 9),  new Point(9, 9),  new Point(10, 9), new Point(0, 9),  new Point(1, 9)],
      [new Point(8, 10), new Point(9, 10), center,           new Point(0, 10), new Point(1, 10)],
      [new Point(8, 0),  new Point(9, 0),  new Point(10, 0), new Point(0, 0),  new Point(1, 0)],
      [new Point(8, 1),  new Point(9, 1),  new Point(10, 1), new Point(0, 1),  new Point(1, 1)],
    ]);
  });
  it('should adjust grid coord if it is a negative number', () => {
    const center = new Point(1, 1);
    // ...-2,-1,0,1... (max: 10)
    // ...8,9,0,1... (max: 10)
    expect(createTileGrid(center, 3, 1, 3, 1, 10)).toStrictEqual([
      [new Point(8, 8), new Point(9, 8), new Point(0, 8), new Point(1, 8)],
      [new Point(8, 9), new Point(9, 9), new Point(0, 9), new Point(1, 9)],
      [new Point(8, 0), new Point(9, 0), new Point(0, 0), new Point(1, 0)],
      [new Point(8, 1), new Point(9, 1), new Point(0, 1), center],
    ]);
  });
});
