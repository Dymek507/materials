export interface ILocation {
  city: string;
  zipCode: string;
  adress?: string;
  voivodeship?: string;
}

export interface ICompany {
  id: string;
  key: string;
  type: string;
  group: string;
  name: string;
  adress: string;
  mail: string;
  person: string;
  phone: string;
  siding: string;
  location: string;
  cords: Cords;
}

export interface IProduct {
  id?: string;
  material: string;
  category: string;
  unit: string;
  price: number;
  company: string;
  cords_storage: Cords;
  date?: string;
  adress?: string;
  distance?: number;
}

export type Cords = {
  lat: number;
  lng: number;
};

export interface IRouteCords {
  from: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  center: { lat: number; lng: number };
}

export interface IModalData {
  cargo: ICargo;
  routesOptions: google.maps.DirectionsResult | undefined;
  routeCords: IRouteCords;
}

export interface IConstructionSite {
  id: string;
  name: string;
  adress: string;
  cords: Cords;
  dist_arr: IDistanceList[];
  date?: string;
}

export interface IDistanceList {
  id: string;
  acc_dist: number;
}
