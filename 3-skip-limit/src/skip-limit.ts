// --- 1000ms
// ---0---1---2---3---4---5---6---7---8---9|
// skipLimit(2, 2)
// ---_---_---2---3---_---_---6---7---_---_| 

import { Observable } from "rxjs";

export function skipLimit<T>(skip: number, limit: number): (source$: Observable<T>) => Observable<T> {
    return (source$: Observable<T>): Observable<T> => {
        let interval = 1;
        let valueIndex = 1;

        return new Observable<T>(subscriber => {
            const subscription = source$.subscribe({
                complete: subscriber.complete.bind(subscriber), // or
                error: () => {
                    subscriber.complete();
                }, // or
                next: value => {
                    const borderRight = interval * (skip + limit);
                    const borderLeft = borderRight - limit;

                    const isNeedValue = valueIndex > borderLeft && valueIndex <= borderRight;

                    if (isNeedValue) {
                        subscriber.next(value);

                    }

                    valueIndex += 1;

                    if (borderRight < valueIndex) {
                        interval += 1;
                    }
                }
            });

            return () => {
                subscription.unsubscribe();
            }
        })
    }
}
