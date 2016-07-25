"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var SearchResult = (function (_super) {
    __extends(SearchResult, _super);
    function SearchResult(props) {
        _super.call(this, props);
    }
    SearchResult.prototype.render = function () {
        return React.createElement("li", {className: "ms-ListItem"}, React.createElement("i", {className: "ms-Icon ms-Icon--circleEmpty", style: "float:left;"}), React.createElement("span", {className: "ms-ListItem-primaryText"}, this.props.result.Title), " entered by ", this.props.result.Author, " (content class: ", this.props.result.contentclass, ")");
    };
    return SearchResult;
}(React.Component));
exports.SearchResult = SearchResult;

//# sourceMappingURL=searchResult.js.map
