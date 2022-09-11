// interval(1000).subscribe(console.log);
// timer(1000).subscribe(console.log);

// of(1, 2, [3, 2], {count: 4}).subscribe(console.log);
// of(5, 6, [7, 8], {count: 9}).subscribe(console.log);

// from(
//     fetch('https://learn.javascript.ru/courses/groups/api/participants?key=1lesw5i')
//         .then(res => res.json())
// ).subscribe(console.log);

// ajax({
//     url: 'https://learn.javascript.ru/courses/groups/api/participants?key=1lesw5i',
//     crossDomain: true,
//     method: 'GET',
// }).subscribe({
//     complete: () => {
//         console.log('COMPLETE');
//     }
// });

// const random = Math.round(Math.random() * 10);

// const def$ = defer(() => {
    // const random = Math.round(Math.random() * 10);

    // return random > 8
    //     ? of('True')
    //     : of('False');
    // return random > 8
    //     ? of(8)
    //     : random > 5
    //         ? of(5)
    //         : of(0)
// });
// const stream$ = iif(
//     // () => Math.round(Math.random() * 10) > 8,
//     () => random > 8,
//     of('True'),
//     of('False'),
// );

// def$.subscribe(console.log);
// stream$.subscribe(console.log);
// def$.subscribe(console.log);
// def$.subscribe(console.log);

// 1000ms = ---
// 0---1---2---3---4---5---6---7---8---9---...
// const stream$ = interval(1000);
// 0---1---2---3---4---5---6---7---8---(9|)
// take(10)
// 0---2---4---6---8---(10)---(12)---(14)---(16)---(18|)
// map(x => x * 2)
// 0---_---_---6---_---____---(12)---____---____---(18|)
// filter(x => x % 3 === 0)
// _---_---_---_---_---____---(12)---____---____---(18|)
// skip(2)

// const doubleWithFilter = pipe(
//     double,
//     filter((x: number) => x % 3 === 0),
// )

// stream$
//     .pipe(
//         take(10),
//         doubleWithFilter,
//         tap(x => {
//             console.log('test', x);
//         }),
//         // customMap(x => Number(x) * 2),
//         // filter(x => x % 3 === 0),
//         skip(2),
//     )
//     .subscribe({
//         complete: () => {
//             console.log('COMPLETE')
//         },
//         next: x => {
//             console.log(x);
//         }
//     });

// function doNothing<T>(source$: Observable<T>): Observable<T> {
//     return source$;
// }

// function toStub<T>(_source$: Observable<T>): Observable<string> {
//     return of('Stub');
// }
// function toStub<T>(_source$: Observable<T>): Observable<string> {
//     return new Observable((sub) => {
//         sub.next('Stub');
//         sub.complete();
//     })
// }
// function toStub<T>(source$: Observable<T>): Observable<string> {
//     return new Observable((sub) => {
//         source$.subscribe({
//             next: value => {
//                 sub.next('Stub');
//             },
//             complete: () => {
//                 sub.complete();
//             }
//         })
//     })
// }
// function customMap<T,U>(cb: (value: T) => U): (source$: Observable<T>) => Observable<U> {
//     return (source$: Observable<T>): Observable<U> => {
//         return new Observable<U>(subscriber => {
//             source$.subscribe({
//                 next: value => {
//                     subscriber.next(cb(value))
//                 },
//                 complete: () => {
//                     subscriber.complete();
//                 },
//                 error: error => {
//                     subscriber.error(error);
//                 },
//             })
//         })
//     }
// }


// ________________Долг
// class DoubleSubscriber extends Subscriber<number> {
//     constructor(subscriber: Subscriber<number>) {
//         super();
//     }

//     next(value?: number | undefined) {
//         super.next(value ? value * 2 : NaN);
//     }
// }

// function double(source$: Observable<number>): Observable<number>  {
//     return new Observable<number>(subscriber => {
//         // const doubleSubscriberClass = new DoubleSubscriber(subscriber);
//         source$.subscribe({
//             next: value => {
//                 subscriber.next(value * 2);
//             },
//             complete: () => {
//                 subscriber.complete();
//             },
//             error: error => {
//                 subscriber.error(error);
//             },
//         });
//     })
// };
// ________________Долг
// ________________Долг Решение
// class DSubscriber extends Subscriber<number> {
    //     next(value: number): void {
    //         super.next(value * 2);
    //     }
    // }
    
    // function double(source$: Observable<number>): Observable<number>  {
    //     return new Observable<number>(subscriber => {
    //         // source$.subscribe(new DSubscriber(subscriber));
    //         source$.subscribe({
    //             ...subscriber,
    //             next: value => {
    //                 subscriber.next(value * 2)
    //             }
    //         });
    //     })
    // };
    
    // interval(1000).pipe(double, take(3)).subscribe({
    //     next(value) {
    //         console.log(value)
    //     },
    //     complete() {
    //         console.log("com")
    //     },
    // });
// ________________Долг Решение

// function pipe(
//     ...operators: Array<(source$: Observable<any>) => Observable<any>>
// ): (source$: Observable<any>) => Observable<any> {
//     return (source$: Observable<any>): Observable<any> => operators.reduce(
//         (
//             source$: Observable<any>,
//             operator: (source$: Observable<any>) => Observable<any>
//         ): Observable<any> => operator(source$),
//         source$
//     )
// }
