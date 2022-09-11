import { filter, fromEvent, map, merge, Observable, pipe, zip } from "rxjs";

// First
// const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
// const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
// const touchStart$ = fromEvent<MouseEvent>(document, 'touchstart');
// const touchEnd$ = fromEvent<MouseEvent>(document, 'touchend');

// const down$ = merge(mouseDown$, touchStart$);
// const up$ = merge(mouseUp$, touchEnd$);

// function getXPosition$(source$: Observable<MouseEvent | TouchEvent>): Observable<number> {
//     return source$.pipe(
//         map(event => event instanceof MouseEvent
//             ? event.clientX
//             : event.changedTouches.item(0)!.clientX,
//         ),
//     )
// }

// export const swipe$ = zip(getXPosition$(down$), getXPosition$(up$)).pipe(
    // map(([start, end]) => start - end),
    // filter(diff => !(diff < 20 && diff > -20)),
// );

// Alt
export function getXPosition$(source$: Observable<MouseEvent | TouchEvent>): Observable<number> {
    return source$.pipe(
        map(event => event instanceof MouseEvent
            ? event.clientX
            : event.changedTouches.item(0)!.clientX,
        ),
    )
}

const mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
const mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
const zipXPositionMouseEvent$ = zip(getXPosition$(mouseDown$), getXPosition$(mouseUp$));

const touchStart$ = fromEvent<MouseEvent>(document, 'touchstart');
const touchEnd$ = fromEvent<MouseEvent>(document, 'touchend');
const zipXPositionTouchEvent$ = zip(getXPosition$(touchStart$), getXPosition$(touchEnd$));

const getDiffWithFilter = pipe(
    map(([start, end]) => start - end),
    filter(diff => !(diff < 20 && diff > -20)),
)

export const swipe$ = merge(zipXPositionMouseEvent$, zipXPositionTouchEvent$).pipe(
    getDiffWithFilter
)