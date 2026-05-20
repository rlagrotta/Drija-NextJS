export type Retailer = {
  id: string;
  name: string;
  url: string;
  logo?: string;
};

export type CountryRetailers = {
  country: string;
  countryCode: string;
  retailers: Retailer[];
  technicalServiceUrl?: string;
};
