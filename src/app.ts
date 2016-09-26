/// <reference path="./main.d.ts" />

import { makeDOMDriver } from "@cycle/dom";
import { makeHTTPDriver } from "@cycle/http";
import { makeAuth0Driver, protect } from "cyclejs-auth0";
import { ISources, ISinks} from "./ifaces";
import { run } from "@cycle/xstream-run";
import { html } from "snabbdom-jsx";

import { NavigationComponent } from "./navigation.component";

(<any> window).JSX = {createElement: html};

const main = (sources: ISources): ISinks => {
  const protectedComponent: ISinks = protect(NavigationComponent)(sources);

  const sinks: ISinks = {
    dom: protectedComponent.dom,
    auth0: protectedComponent.auth0,
    decorators: {
      http: (request, token) => {
        request.headers.Authorization = "Bearer " + token;
        return request;
      }
    },
  };

  return sinks;
};

run(main, {
  dom: makeDOMDriver("#app"),
  http: makeHTTPDriver(),
  auth0: makeAuth0Driver("PCKS1sxqll6EphI7h0VjpkqBe4mZBNag", "jviveret.eu.auth0.com"),
});
