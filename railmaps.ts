import Overpass, { OSMElement, OSMNode, OSMRelation, OverpassQueryResult } from "./overpass";

export class NoNearbyRailways extends Error {
  constructor() {
    super("NoNearbyRailways");
    this.message = "No nearby railways found";
  }
}

export class CurrentRailwayNotSet extends Error {
  constructor() {
    super("CurrentRailwayNotSet");
    this.message = `No current railway is set. Call setNearestRailway(lat, lng).`;
  }
}

class BoundingBox {
  bounds: [number, number, number, number]
  constructor(bounds: [number, number, number, number]) {
    this.bounds = bounds;
  }
  toString() {
    return `(${this.bounds.join(",")})`;
  }
}

export class RailMaps {
  #overpassAPISettings: string = "[out:json]";
  #overpass: Overpass = new Overpass()
  #config: {
    nearestRailwayBBoxTolerance: number;
  } = {
    nearestRailwayBBoxTolerance: 1e-3
  }
  #currentRailway?: OSMRelation

  get currentRailway() {
    return this.#currentRailway;
  }

  #queryWithSettings<ElementType = OSMElement>(query: string): Promise<OverpassQueryResult<ElementType>> {
    return this.#overpass.query(this.#overpassAPISettings + ";\n" + query);
  }

  #getBoundingBoxForPosition(lat: number, lng: number): BoundingBox {
    return new BoundingBox([
      lat - this.#config.nearestRailwayBBoxTolerance,
      lng - this.#config.nearestRailwayBBoxTolerance,
      lat + this.#config.nearestRailwayBBoxTolerance,
      lng + this.#config.nearestRailwayBBoxTolerance
    ]);
  }

  // TODO: download states or regions and save locally
  async setNearestRailway(lat: number, lng: number) {
    const bbox = this.#getBoundingBoxForPosition(lat, lng);
    const query = `rel["route"="railway"]${bbox};
    out tags;`;
    // TODO: pick the closest one or ask the user if there are multiple
    const railways = (await this.#queryWithSettings<OSMRelation>(query)).elements;
    if (railways.length)
      this.#currentRailway = railways[0];
    else
      throw new NoNearbyRailways();
  }

  // TODO: store in local db
  async getCrossingsForRailway() {
    if (!this.currentRailway?.id)
      throw new CurrentRailwayNotSet();
    const query = `rel(id:${this.currentRailway?.id});
    (._; >;); 
    node._["railway"="level_crossing"];
    out qt;`
    const crossings: OSMNode[] = (await this.#queryWithSettings<OSMNode>(query)).elements;
    return crossings;
  }

  async getCitiesAlongRailway() {
    if (!this.currentRailway?.id)
      throw new CurrentRailwayNotSet();
    const query = `rel(id:${this.currentRailway?.id});
    node["place"~"city|town"](around:3000);
    out qt;`
    const cities: OSMNode[] = (await this.#queryWithSettings<OSMNode>(query)).elements;
    return cities;
  }
}
