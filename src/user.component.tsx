import { Stream } from "xstream";
import { ISources, ISinks} from "./ifaces";
import isolate from "@cycle/isolate";

export const UserComponent = isolate((sources: ISources): ISinks => {
  const getProfileRequest$ = sources.props.token$
    .filter(token => !!token)
    .map(token => ({action: "getProfile", params: token }));

  const user$ = sources.auth0
    .select("getProfile")
    .map(action => action.response);

  const logout$ = sources.dom.select(".logout").events("click")
    .map(() => ({ action: "logout" }));

  return {
    auth0: Stream.merge(getProfileRequest$, logout$),
    dom: user$.map(user => (
      <div classNames="nav navbar-nav pull-xs-right">
        <a classNames="nav-item nav-link logout" href>
          { user.name }&nbsp;<img src={user.picture} height="25" />
        </a>
      </div>
    )),
  };
});
