interface SearchResultItem {
    Author: string,
    Path: string,
    Title: string,
    contentclass: string,
    Description: string,
    DocId: string,
    FileExtension?: string,
    IsDocument?: string,
    LastModifiedTime?: Date,
    PictureThumbnailURL?: string,
    Rank?: number,
    SIteName?: string,
    Write?: Date
}

interface IAppProps {

}

interface IAppState {
}

interface IHeaderState {
    siteTitle: string
}

interface ISearchResultProps {
    result: SearchResultItem
}

interface ISearchResultState {
}

interface ISearchResultsProps {
    query: string
}

interface ISearchResultsState {
    loading: boolean,
    query: string,
    results: Array<any>,
    resultCount: number
}