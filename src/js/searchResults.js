"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var sp_pnp_js_1 = require("sp-pnp-js");
var searchResult_1 = require("./searchResult");
var SearchResults = (function (_super) {
    __extends(SearchResults, _super);
    function SearchResults(props) {
        var _this = this;
        _super.call(this, props);
        this.searchTextChanged = function (e) {
            console.log("searchTextChanged");
            _this.setState({
                loading: false,
                query: e.target.value,
                results: _this.state.results,
                resultCount: _this.state.resultCount
            });
        };
        this.submitSearch = function () {
            console.log("Searching on '" + _this.state.query + "'");
            _this.setState({
                loading: true,
                query: _this.state.query,
                results: [],
                resultCount: 0
            });
            console.log(" ..adjusted state");
            sp_pnp_js_1.default.sp.search({
                Querytext: _this.state.query,
                RowLimit: 5
            })
                .then(function (data) {
                console.log("  - got search results");
                if (typeof data !== 'undefined' && typeof data["PrimarySearchResults"] !== 'undefined') {
                    //setState does not immediately change the state, but creates a pending state transition
                    _this.setState({
                        loading: false,
                        query: _this.state.query,
                        results: data["PrimarySearchResults"],
                        resultCount: data["PrimarySearchResults"].length
                    });
                }
            })
                .catch(function (e) { console.log("Error: " + e.message); });
        };
        console.log("constructor");
        this.state = {
            loading: false,
            query: this.props.query,
            results: [],
            resultCount: 0
        };
        this.submitSearch();
    }
    SearchResults.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        console.log("shouldComponentUpdate");
        return (nextState.resultCount !== this.state.resultCount ||
            nextState.results !== this.state.results ||
            nextState.loading !== this.state.loading);
    };
    SearchResults.prototype.renderSpinner = function () {
        console.log("renderSpinner(): " + this.state.loading);
        if (!this.state.loading) {
            return null;
        }
        return React.createElement("div", {className: "ms-Spinner", style: { position: 'absolute' }});
    };
    SearchResults.prototype.render = function () {
        //Each dynamic child needs to have a unique key (see https://fb.me/react-warning-keys)
        //  and http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/
        var resultItems = this.state.results.map(function (result, i, a) {
            return (React.createElement(searchResult_1.SearchResult, {key: result.DocId, result: result}));
        }, this);
        //Note - the dynamic element properties DO NOT HAVE SURROUNDING QUOTES
        //Note - the .bind(this) method call COULD be added to the onclick handler so that the instnace context is available in that handler
        //          (without the bind call, the handler is unable to access this.props and this.state)
        //      However, in this case the handler is defined using an arrow function, so "this" is available
        return React.createElement("div", null, React.createElement("div", {className: "ms-TextField"}, React.createElement("label", {className: "ms-Label"}, "Search text"), React.createElement("input", {type: "text", className: "ms-TextField-field", defaultValue: this.props.query, onChange: this.searchTextChanged})), React.createElement("input", {type: "button", value: "Search", onClick: this.submitSearch}), this.renderSpinner(), React.createElement("div", {className: "ms-borderColor-tealLight"}, "Found ", this.state.resultCount, " results for search term \"", this.state.query, "\":"), React.createElement("ul", {className: "ms-List"}, resultItems));
    };
    return SearchResults;
}(React.Component));
exports.SearchResults = SearchResults;

//# sourceMappingURL=searchResults.js.map
