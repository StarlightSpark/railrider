import { argv } from "process";
import { OSMNode } from "./overpass";
import { NoNearbyRailways, RailMaps } from "./railmaps";

const railmap = new RailMaps();

const [lat, lng] = argv.slice(2).map(_ => parseFloat(_));

const main = async () => {
  try {
    await railmap.setNearestRailway(lat, lng);
  } catch (e) {
    if (e instanceof NoNearbyRailways)
      console.log("There are no nearby railways");
    return;
  }
  const cities: OSMNode[] = await railmap.getCitiesAlongRailway();
  const crossings: OSMNode[] = await railmap.getCrossingsForRailway();

  if (railmap.currentRailway?.tags !== undefined) {
    const { operator, name } = railmap.currentRailway?.tags;
    console.debug(`You are on the ${operator} ${name}`);
    console.debug("\nCities along route:\n" + cities.map(city => "* " + city.tags?.name).join("\n"));
    console.debug(`\nThere are ${crossings.length} crossings along the route.`);
  }
}

main();
