import { MarkerInfo } from "../Map";

export function createGeoJSONPoint(marker: MarkerInfo): string {
    const { name, comments, score, categoria, coords } = marker;
  
    return JSON.stringify({
      type: "Feature",
      geometry: {
        type: 'Point',
        coordinates: coords,
      },
      properties: {
        name,
        comments,
        score,
        categoria,
      },
    });
  }