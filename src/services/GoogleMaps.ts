import axios from "axios";
import { Coordinate } from "ol/coordinate";

// load Google Maps library the ghetto Google way
const gmapsScript = document.createElement("script");
gmapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPS_API_KEY}&libraries=places`;
document.head.appendChild(gmapsScript);

export interface CityWithID {
  name: string;
  id?: string;
}

export async function getLocality(coords: GeolocationCoordinates): Promise<string> {
  const params = new URLSearchParams({
    latlng: `${coords.latitude},${coords.longitude}`,
    key: process.env.VUE_APP_GMAPS_API_KEY ?? "",
    "result_type": "locality"
  });

  const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?" + params.toString());
  
  const results = data?.results[0];
  if (!results) throw "No Results";

  const locality = results.address_components.find((component: any) => component.types.includes("locality"))?.short_name;
  const state = results.address_components.find((component: any) => component.types.includes("administrative_area_level_1"))?.short_name;
  
  return `${locality}, ${state}`;
}

export function getAutocompleteDestinationResults(input: string, around: GeolocationCoordinates): Promise<CityWithID[]> {
  return new Promise((resolve, reject) => {
    const params: google.maps.places.AutocompletionRequest = {
      input,
      location: new google.maps.LatLng(around.latitude, around.longitude),
      radius: 400e+3,
      componentRestrictions: {
        country: "us"
      },
      types: ["(cities)"],
    };
  
    const handleResult = function (
      predictions: google.maps.places.QueryAutocompletePrediction[] | null,
      status: google.maps.places.PlacesServiceStatus
    ) {
      if (status != google.maps.places.PlacesServiceStatus.OK || !predictions) {
        reject(status);
      }

      if (predictions)
        resolve(predictions.map(({ terms, place_id: id }) => ({
          name: `${terms[0].value}, ${terms[1].value}`,
          id
        })));
    };
  
    const autocomplete = new google.maps.places.AutocompleteService();
    autocomplete.getPlacePredictions(params, handleResult)
      .catch((e) => reject(e));
  });
}

export async function getCoordiniatesForPlace(placeId: string): Promise<Coordinate> {
  const params = new URLSearchParams({
    "place_id": placeId,
    key: process.env.VUE_APP_GMAPS_API_KEY ?? ""
  });

  const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?" + params.toString());
  const { lat,lng } = data.results[0].geometry.location;
  return [lat, lng];
}
