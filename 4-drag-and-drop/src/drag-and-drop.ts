import { map, Observable, switchMap, takeUntil, tap } from "rxjs";

export function drag(
    sourceMouseDown$: Observable<MouseEvent>,
    sourceMouseMove$: Observable<MouseEvent>,
    sourceMouseUp$: Observable<MouseEvent>,
): Observable<{top: number, left: number}> {
    return sourceMouseDown$.pipe(
        tap(event => {
            event.preventDefault();
        }),
        switchMap(mouseDownEvent => {
            const {
                x: startXPosition,
                y: startYPosition,
            } = (mouseDownEvent.target as HTMLElement).getBoundingClientRect();

            return sourceMouseMove$.pipe(
                tap(mouseMoveEvent => {
                    mouseMoveEvent.preventDefault();
                }),
                map(mouseMoveEvent => ({
                    top: startYPosition + (mouseMoveEvent.clientY - mouseDownEvent.clientY),
                    left: startXPosition + (mouseMoveEvent.clientX - mouseDownEvent.clientX),
                })),
                takeUntil(sourceMouseUp$),
            );
        }),
        // takeUntil(sourceMouseUp$),
    )
}