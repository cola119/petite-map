# Petite Map

Super Tiny JavaScript library for raster maps with CSS grid layout

[Example](https://cola119.github.io/petite-map/example/)

## Benchmarks

<!-- curl --compressed -so /dev/null https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css -w '%{size_download}\n' -->

|             | [Petite Map](https://unpkg.com/petite-map@0.0.2/dist/index.umd.js) | [Leaflet](https://unpkg.com/leaflet@1.7.1/dist/leaflet.js) | [Google Maps](https://maps.googleapis.com/maps/api/js) | [mapbox-gl.js](https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js) |
| ----------- | ------------------------------------------------------------------ | ---------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| Size (gzip) | 1771                                                               | 55099(js) + 4303(css)                                      | 50310                                                  | 237857(js) + 4849(css)                                                  |
| Map Type    | Raster                                                             | Raster                                                     | Raster                                                 | Vector                                                                  |

## Install

```sh
$ npm install petite-map
```

```html
<body>
  <div id="map" style="width: 600px; height: 400px;"></div>
</body>
```

```ts
import PMap from 'petite-map';

const map = new PMap('map', {
  center: { lat: 35.6812, lng: 139.7671 },
  zoom: 16,
});
```
