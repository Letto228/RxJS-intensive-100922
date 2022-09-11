// Subject = Observable + Observer(Subscriber);

// const voidStream$ = new Subject<void>();

// voidStream$.subscribe(() => {
//     terminalLog('push');
// })

// voidStream$.next();
// voidStream$.next();

// setTimeout(() => {

//     voidStream$.next();
// }, 3000)


// const stream$ = new AsyncSubject<number>();

// stream$.subscribe(value => {
//     terminalLog('Sub 1 - ' + value)
// });

// // terminalLog('Sync' + stream$.value);

// stream$.next(1);
// stream$.next(2);
// stream$.next(3);

// setTimeout(() => {
//     stream$.subscribe(value => {
//         terminalLog('Sub 2 - ' + value)
//     })

//     // stream$.next(9);
// }, 3000);

// // setTimeout(() => {
// //     terminalLog('Subscribe');
// //     stream$.subscribe(value => {
// //         terminalLog('Sub 3 - ' + value)
// //     })
// // }, 5000);

// // setTimeout(() => {
// //     terminalLog('Sync' + stream$.value);
// // }, 3000);


// setTimeout(() => {
//     stream$.next(4);
//     stream$.next(5);
//     stream$.next(6);
// }, 6000);

// setTimeout(() => {
//     stream$.complete();
// }, 8000);

// function getItems<T>(config: AjaxConfig): Observable<T> {
//     let asyncSubject!: AsyncSubject<T>;

//     return new Observable(subscriber => {
//         if (!asyncSubject) {
//             asyncSubject = new AsyncSubject<T>();

//             ajax<T>(config)
//                 .pipe(map(({response}) => response))
//                 .subscribe(asyncSubject);
//         }

//         return asyncSubject.subscribe(subscriber);
//     })
// }

// const repositories$ = getItems({url: 'https://api.github.com/search/repositories?q=1234'})

// repositories$.subscribe(console.log);
// repositories$.subscribe(console.log);
// repositories$.subscribe(console.log);
// repositories$.subscribe(console.log);