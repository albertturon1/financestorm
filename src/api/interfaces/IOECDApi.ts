import { PrefetchRequest } from '@interfaces/IApi';

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
  [x: string]: Observation;
}

interface DataSet {
  action: string;
  observations: Observations;
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

export interface OECDResponse {
  header: Header;
  dataSets: DataSet[];
  structure: Structure;
}

export interface MonthlyCPIRequest {
  startPeriod: string;
  endPeriod: string;
}
