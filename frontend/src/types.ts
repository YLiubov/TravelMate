// TypeScript types describe the shape of the data we receive from the API.
// `string`, `number`, and `boolean` are JavaScript data types; TypeScript checks them before runtime.
export type LanguageCode = "en" | "da";

export type LocalizedInfo = {
  id: number;
  languageId?: number;
  name: string;
  description: string;
  language?: {
    code: string;
    name: string;
  };
};

export type Country = {
  id: number;
  code: string;
  image: string;
  infos: LocalizedInfo[];
};

export type City = {
  id: number;
  countryId: number;
  slug: string;
  image: string;
  infos: LocalizedInfo[];
};

export type Attraction = {
  id: number;
  cityId: number;
  slug: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  website: string;
  infos?: LocalizedInfo[];
};

export type CityDetails = City & {
  // "&" combines City fields with the extra fields returned on a detail endpoint.
  country: {
    id: number;
    code: string;
    image: string;
  };
  attractions: Attraction[];
};

export type AttractionDetails = Attraction & {
  // Pick keeps only the City fields needed in this detail response.
  city: Pick<City, "id" | "countryId" | "slug" | "image">;
  infos: LocalizedInfo[];
};
