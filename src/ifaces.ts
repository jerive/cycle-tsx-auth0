import { VNode } from "@cycle/dom";
import { Stream } from "xstream";
import { DOMSource } from "@cycle/dom/xstream-typings";
import { makeHTTPDriver, HTTPSource } from "@cycle/http";

export interface ISources {
  dom: DOMSource;
  http: HTTPSource;
  props: any;
  auth0: { select(events: string): Stream<any> };
}

export interface ISinks {
  dom: Stream<VNode>;
  auth0?: Stream<any>;
  decorators?: any;
}
