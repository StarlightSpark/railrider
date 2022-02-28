import axios, { AxiosResponse } from "axios";
const serverAddress: string = "https://lz4.overpass-api.de/api/interpreter";

export interface Tags {
  railway?: string,
  name?: string,
  operator?: string
}

export interface OSMNode extends OSMElement{
  lat: number,
  lon: number,
}

export interface OSMWay extends OSMElement {

}

export interface OSMRelation extends OSMElement {

}

export interface OSMElement {
  type: string,
  id: number,
  tags?: Tags,
}

export interface OverpassQueryResult<ElementType> {
  elements: ElementType[]
}

export default class Overpass {
  async query<ElementType>(rawQuery: string): Promise<OverpassQueryResult<ElementType>> {
    const body = new URLSearchParams({ data: rawQuery });
    const { data }: AxiosResponse<OverpassQueryResult<ElementType>> = await axios.post(serverAddress, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
    return data;
  }
}
