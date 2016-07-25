declare var require: {
    (path: string): any;
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare class AppHeader {}

declare class Loader {}

declare class SearchResults {}

declare class SearchResult {}