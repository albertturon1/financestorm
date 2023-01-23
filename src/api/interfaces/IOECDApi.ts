interface HeaderSender {
  id: string;
  name: string;
}

interface Links {
  href: string;
  rel: string;
}

interface Header {
  id: string;
  test: boolean;
  prepared: string;
  sender: HeaderSender;
  links: Links[];
}

export type Observation = [number, null];

interface Observations {
  string: Observation;
}

interface DataSet {
  action: string;
  series: {
    '0.0.0.0.0': { observations: Observations; attributes: number[] };
  };
}

interface Value {
  id: string;
  name: string;
}

interface DimensionsObservation {
  keyPosition: number;
  id: string;
  name: string;
  values: Value[];
  role: string;
}

interface Dimension {
  observation: DimensionsObservation[];
}

interface AttributesObservation {
  id: string;
  name: string;
  values: Value[];
}

interface Annotations {
  title: string;
  uri: string;
  text: string;
}

interface Structure {
  links: Links[];
  name: string;
  description: string;
  dimensions: Dimension;
  attributes: AttributesObservation[];
  annotations: Annotations[];
}

export interface CountryMonthlyInflationRateResponse {
  header: Header;
  dataSets: DataSet[];
  structure: Structure;
}

export interface MonthlyInflationRatesRequest {
  startPeriod: string;
  endPeriod: string;
}
