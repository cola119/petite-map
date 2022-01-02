import { Point } from './point';
import { WebMercatorProjection } from './projection';

describe('projection', () => {
  it('project LatLng to Point', () => {
    const { project } = new WebMercatorProjection();
    expect(project({ lng: 0, lat: 0 })).toStrictEqual(new Point(0, 0));
    expect(project({ lng: 45, lat: 45 })).toStrictEqual(
      new Point(0.7853981633974483, 0.8813735870195429)
    );
    expect(project({ lng: 90, lat: 90 })).toStrictEqual(
      new Point(1.5707963267948966, Infinity)
    );
  });
});
