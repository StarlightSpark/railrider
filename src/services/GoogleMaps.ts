import axios from "axios";

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

export async function getAutocompleteDestinationResults(input: string, around: GeolocationCoordinates) {
  console.log("searching for input", input);
  const params: google.maps.places.AutocompletionRequest = {
    input,
    location: new google.maps.LatLng(around.latitude, around.longitude),
    componentRestrictions: {
      country: "us"
    },
    types: ["(cities)"],
  };

  // const autocomplete = new google.maps.places.AutocompleteService();

  // autocomplete.getPlacePredictions(params, (prediction, status) => {
  //   console.log("prediction", prediction);
  //   console.log("status", status);
  // });

  // const params = new URLSearchParams({
  //   input,
  //   components: "country:us",
  //   location: `${around.latitude},${around.longitude}`,
  //   radius: "1000",
  //   key: process.env.VUE_APP_GMAPS_API_KEY ?? "",
  //   "types": "cities"
  // });

  // const results = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?" + params.toString());
  // return results;



}
