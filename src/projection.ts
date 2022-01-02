import { Point } from './point';
import { LatLng } from './type';
import { rad } from './utils';

interface Projection {
  project(latlng: LatLng): Point;
}

export class WebMercatorProjection implements Projection {
  project({ lat, lng }: LatLng): Point {
    const sinLat = Math.sin(rad(lat));
    return new Point(rad(lng), Math.log((1 + sinLat) / (1 - sinLat)) / 2);
  }
}
