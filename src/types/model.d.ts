export interface ILocation {
  city: string;
  zipCode: string;
  adress?: string;
  voivodeship?: string;
}

export interface ICompany {
  group: string;
  company: string;
  nip?: string;
  id: string;
  category: string[];
  adress: string;
  cords: Cords;
  mail: string | string[];
  person: string | string[];
  phone: string[];
  siding: string;
  comment: string;
  date?: string;
  update?: string;
}

export interface IProduct {
  id?: string;
  company?: string;
  category: string[];
  type: string;
  material: string;
  unit: string;
  price: number;
  key?: string;
  adress?: string;
  cords: Cords;
  date?: string;
  distance?: number;
  masa?: string;
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

export interface ICategory {
  name: string;
  key: string;
}

export type UserData = {
  login: string;
  uId: string | null;
};
