import { Point } from './point';
import { WebMercatorProjection } from './projection';
import { LatLng } from './type';

const osmTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export class PMap {
  private _container: HTMLDivElement;
  private zoom: number;
  private center: LatLng;
  private tileUrl: string;
  private tileSize: number;
  private projection = new WebMercatorProjection();

  constructor(
    id: string,
    option: {
      center: LatLng;
      zoom?: number;
      tileUrl?: string;
      tileSize?: number;
    }
  ) {
    const container = document.getElementById(id) as HTMLDivElement | null;
    if (!container) {
      throw new Error('map container is missing');
    }
    this._container = container;
    this.zoom = option.zoom ?? 12;
    this.center = option.center;
    this.tileUrl = option.tileUrl ?? osmTileUrl;
    this.tileSize = option.tileSize ?? 256;
    this.init();
  }

  private get tileNum(): number {
    return Math.pow(2, this.zoom);
  }

  private get radius(): number {
    return (this.tileSize * this.tileNum) / (2 * Math.PI);
  }

  project(latlng: LatLng): Point {
    return this.projection.project(latlng);
  }

  private init(): void {
    const W = this._container.clientWidth;
    const H = this._container.clientHeight;
    const T = this.tileSize;

    const centerPixelCoord = this.latlngToPixelCoord(this.center);
    const centerTile = centerPixelCoord.div(T).floor();
    const centerInTileCoord = centerPixelCoord.sub(centerTile.mul(T));

    const originToCenterTileDistanceX = W / 2 - centerInTileCoord.x;
    const originToCenterTileDistanceY = H / 2 - centerInTileCoord.y;

    const formerTileNumX = Math.ceil(originToCenterTileDistanceX / T);
    const formerTileNumY = Math.ceil(originToCenterTileDistanceY / T);
    const latterTileNumX = Math.ceil((W - originToCenterTileDistanceX) / T);
    const latterTileNumY = Math.ceil((H - originToCenterTileDistanceY) / T);

    const tileGrid = createTileGrid(
      centerTile,
      formerTileNumX,
      latterTileNumX,
      formerTileNumY,
      latterTileNumY,
      this.tileNum
    );
    const fragment = document.createDocumentFragment();
    tileGrid.forEach((rows, row) => {
      rows.forEach(({ x, y }, col) => {
        const imgEl = document.createElement('img');
        imgEl.src = createCompleteTileUrl(this.tileUrl, { x, y, z: this.zoom });
        imgEl.alt = '';
        imgEl.setAttribute('draggable', 'false');
        imgEl.setAttribute('role', 'presentation');
        imgEl.style.width = `${T}px`;
        imgEl.style.height = `${T}px`;
        imgEl.style.gridRow = `${row + 1}`;
        imgEl.style.gridColumn = `${col + 1}`;
        fragment.appendChild(imgEl);
      });
    });

    const tileLayer = document.createElement('div');
    tileLayer.appendChild(fragment);
    tileLayer.style.display = 'grid';
    tileLayer.ondragstart = (): boolean => false;

    tileLayer.style.gridTemplateRows = `repeat(${
      formerTileNumY + latterTileNumY
    }, 256px)`;
    tileLayer.style.gridTemplateColumns = `repeat(${
      formerTileNumX + latterTileNumX
    }, 256px)`;

    tileLayer.style.marginLeft = `${
      originToCenterTileDistanceX - T * formerTileNumX
    }px`;
    tileLayer.style.marginTop = `${
      originToCenterTileDistanceY - T * formerTileNumY
    }px`;

    this._container.appendChild(tileLayer);
    this._container.style.overflow = 'hidden';
  }

  private latlngToPixelCoord(latlng: LatLng): Point {
    const worldCoord = this.project(latlng);
    const shifted = worldCoord.mul({ x: 1, y: -1 }).add(Math.PI);
    return shifted.mul(this.radius);
  }
}

export const createCompleteTileUrl = (
  baseUrl: string,
  { x, y, z }: { x: number; y: number; z: number }
): string => {
  return baseUrl
    .replace('{x}', `${x}`)
    .replace('{y}', `${y}`)
    .replace('{z}', `${z}`);
};

export const createTileGrid = (
  center: Point,
  formerTileNumX: number,
  latterTileNumX: number,
  formerTileNumY: number,
  latterTileNumY: number,
  maxTileNum: number
): Point[][] => {
  const coords: Point[][] = [];
  for (let j = -1 * formerTileNumY; j < latterTileNumY; j++) {
    const rowCoords: Point[] = [];
    for (let i = -1 * formerTileNumX; i < latterTileNumX; i++) {
      const _x = center.x + i;
      const _y = center.y + j;
      const x =
        _x < 0
          ? _x + maxTileNum * Math.ceil((-1 * _x) / maxTileNum)
          : _x >= maxTileNum
          ? _x % maxTileNum
          : _x;
      const y =
        _y < 0
          ? _y + maxTileNum * Math.ceil((-1 * _y) / maxTileNum)
          : _y >= maxTileNum
          ? _y % maxTileNum
          : _y;
      rowCoords.push(new Point(x, y));
    }
    coords.push(rowCoords);
  }
  return coords;
};
