import axios from "axios";
import { Coordinate } from "ol/coordinate";
import { LineString } from "ol/geom";

export class FailedToCalculateRoute extends Error {
  constructor() {
    super("FailedToCalculateRoute");
    this.message = "Failed to calculate route";
  }
}

interface Path {
  distance: number;
  weight: number;
  time: number;
  transfers: number;
  points_encoded: number;
  bbox: number[];
  points: {
    type: string;
    coordinates: LineString;
  };
}

export async function getRoutes(from: Coordinate, to: Coordinate): Promise<any[]> {
  const queryStringParams = new URLSearchParams([
    ["point", from.join(",")],
    ["point", to.join(",")],
    ["vehicle", "freight_diesel"],
    ["locale", "us"],
    ["points_encoded", "false"]
  ]);
  
  try {
    const { data } = await axios.get("http://localhost:8081/route?" + queryStringParams.toString());
    return data.paths;
  } catch {
    throw new FailedToCalculateRoute();
  }
}
