import * as React from "react";
import * as ReactDOM from "react-dom";

export class SearchResult extends React.Component<ISearchResultProps, ISearchResultState> {

    constructor(props: ISearchResultProps) {
        super(props);
    }

    public render() {
        return <li className="ms-ListItem"><i className="ms-Icon ms-Icon--circleEmpty" style="float:left;"></i><span className="ms-ListItem-primaryText">{this.props.result.Title}</span> entered by {this.props.result.Author} (content class: {this.props.result.contentclass})</li>;
    }
}
