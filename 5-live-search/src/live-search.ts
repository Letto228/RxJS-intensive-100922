import { debounceTime, distinctUntilChanged, filter, map, Observable, pipe, switchMap } from "rxjs";
import { ajax, AjaxConfig } from "rxjs/ajax";
import { requestToHtmlString } from "./request-to-html-string";

const searchDebounce = 300;

export function liveSearch<T>(
    urlCreater: (searchParam: string) => string,
    requestConfig: Omit<AjaxConfig, 'url'> = {crossDomain: true},
): (source$: Observable<string>) => Observable<T> {
    return pipe(
        debounceTime(searchDebounce),
        filter(searchParam => searchParam.length > 3),
        distinctUntilChanged(),
        map<string, AjaxConfig>(searchParam => ({
            ...requestConfig,
            url: urlCreater(searchParam),
        })),
        switchMap(ajaxConfig => ajax<T>(ajaxConfig).pipe(
            map(({response}) => response),
        ))
    );
}