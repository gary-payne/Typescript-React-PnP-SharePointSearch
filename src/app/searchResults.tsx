import * as React from "react";
import * as ReactDOM from "react-dom";
import pnp from "sp-pnp-js";
import { SearchResult } from "./searchResult";

export class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsState> {

    constructor(props: ISearchResultsProps) {
        super(props);
        console.log("constructor");
        this.state = {
            loading: false,
            query: this.props.query,
            results: [],
            resultCount: 0
        };        
        this.submitSearch();
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return (
            nextState.resultCount !== this.state.resultCount ||
            nextState.results !== this.state.results ||
            nextState.loading !== this.state.loading
        );
    }

    searchTextChanged = (e) => {
        console.log("searchTextChanged");
            this.setState({
                loading: false,
                query: e.target.value, 
                results: this.state.results, 
                resultCount: this.state.resultCount
        });
    }

    submitSearch = () => {
        console.log("Searching on '" + this.state.query + "'");
        this.setState({
            loading: true,
            query: this.state.query, 
            results: [],
            resultCount: 0
        });
        console.log(" ..adjusted state");
        pnp.sp.search({
                Querytext: this.state.query,
                RowLimit: 5
            })
                //SelectProperties: ["Title", "Id", "Author", "Path"]
            .then((data) => {
                console.log("  - got search results");
                if (typeof data !== 'undefined' && typeof data["PrimarySearchResults"] !== 'undefined') {
                    //setState does not immediately change the state, but creates a pending state transition
                    this.setState({
                        loading: false,
                        query: this.state.query, 
                        results: data["PrimarySearchResults"], 
                        resultCount: data["PrimarySearchResults"].length
                    });
                }
            })
            .catch((e) => { console.log("Error: " + e.message); });
    }

    renderSpinner() {
        console.log("renderSpinner(): " + this.state.loading);
        if (!this.state.loading) {
            return null;
        }
        return <div className="ms-Spinner" style={{position: 'absolute'}}></div>
    }

    public render() {
        //Each dynamic child needs to have a unique key (see https://fb.me/react-warning-keys)
        //  and http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/
        var resultItems = this.state.results.map((result, i, a) => {
                return (<SearchResult key={result.DocId} result={result} />);
            }, this);

        //Note - the dynamic element properties DO NOT HAVE SURROUNDING QUOTES
        //Note - the .bind(this) method call COULD be added to the onclick handler so that the instnace context is available in that handler
        //          (without the bind call, the handler is unable to access this.props and this.state)
        //      However, in this case the handler is defined using an arrow function, so "this" is available
        return <div>
            <div className="ms-TextField">
                <label className="ms-Label">Search text</label>
                <input type="text" className="ms-TextField-field" defaultValue={this.props.query} onChange={this.searchTextChanged} />
            </div>
            <input type="button" value="Search" onClick={this.submitSearch} />
            {this.renderSpinner()}
            <div className="ms-borderColor-tealLight">Found {this.state.resultCount} results for search term "{this.state.query}":</div>
            <ul className="ms-List">
                {resultItems}
            </ul>
        </div>;
    }
}
