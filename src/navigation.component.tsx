import { UserComponent } from "./user.component";
import { ISources, ISinks } from "./ifaces";

export const NavigationComponent = (sources: ISources): ISinks => {
    const user = UserComponent(sources);
    return {
        auth0: user.auth0,
        dom: user.dom.map(profile => (
            <nav classNames="navigation navbar navbar-fixed-top navbar-dark bg-inverse">
                <a classNames="navbar-brand">"CycleJs - auth0 demo"</a>
                {profile}
            </nav>
        ))
    };
};
