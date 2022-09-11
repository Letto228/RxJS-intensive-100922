import { catchError, debounceTime, delay, delayWhen, distinctUntilChanged, filter, map, NEVER, Observable, pipe, retry, retryWhen, switchMap, tap, timer } from "rxjs";
import { ajax, AjaxConfig } from "rxjs/ajax";
import { terminalLog } from "../../utils/log-in-terminal";
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
            // soursce$.subscribe(() => {
            //      swMapCB.subscribe();//RIP
            // })

            // return new Observable(sub => ... sub.error() ...)
            map(({response}) => response),
            catchError(error => {
                console.log(error);

                return NEVER;
            })
        )),
    );
}