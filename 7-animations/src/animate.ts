import { animationFrameScheduler, asapScheduler, interval, map, Observable, takeWhile, tap } from "rxjs";

const animationFn = (percentage: number) => {
    return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * Math.pow(2, -10 * percentage) + 1;
}

function duration(allMs: number): Observable<number> {
    return time().pipe(
        map(timeDiff => timeDiff / allMs),
        tap(console.log),
        takeWhile(percentage => percentage <= 1),
    )
}

function time(): Observable<number> {
    const startTime = animationFrameScheduler.now();

    return interval(0, animationFrameScheduler).pipe(
        map(() => animationFrameScheduler.now() - startTime),
    );
}

const diffInPx = 100;

export function animationDownElement(element: HTMLElement) {
    return duration(20000).pipe(
        map(animationFn),
        map(percentage => percentage * diffInPx),
        tap(value => {
            element.style.transform = `translateY(${value}px)`
        })
    )
}