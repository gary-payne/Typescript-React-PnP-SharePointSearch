import * as React from "react";
import * as ReactDOM from "react-dom";
import pnp from "sp-pnp-js";
import { AppHeader } from "./AppHeader";
import { SearchResults } from "./searchResults";

window.onload = () => {
    ReactDOM.render(<ReactTests />, document.getElementById("reactContent"));
};

class ReactTests extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
    }

    public render() {
        return <article>                
                <AppHeader />
                <SearchResults query="Document" />
            </article>;
    }
}

