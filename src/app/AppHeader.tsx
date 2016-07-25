import * as React from "react";
import pnp from "sp-pnp-js";

export class AppHeader extends React.Component<{}, IHeaderState> {

    private myLoginName: string;

    constructor() {
        super();
        this.state = {
            siteTitle: "(getting...)"
        };

        //Reading from the _spPageContextInfo object
        this.myLoginName = _spPageContextInfo.userLoginName;

        //Call PnP to get title for this web
        pnp.sp.web.select("Title").get()
            .then((data) => { this.setState({siteTitle:  data.Title}); });
    }

    public render() {
        return <header>
            <h1 className="ms-borderColor-teal">This is a React Search Component</h1>
            <div>Uses Typescript, React, Office UI Fabric and the PnP cor library.</div>
            <div>Built in Visual Studio Code using Gulp and Browserify</div>
            <div>Welcome, {this.myLoginName}, to {this.state.siteTitle}</div>
        </header>;
    }

}
