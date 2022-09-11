// const streamFirst$ = interval(500);
// const streamSecoond$ = of('1', '2', 3, '4');
// const stream$ = zip(streamFirst$, streamSecoond$);

// stream$
//     .pipe(
//         map(([_, text]) => (text as any).toUpperCase()),
//         // retry({
//         //     count: 3,
//         //     delay: (error, errCount) => {
//         //         console.log(error, errCount);

//         //         return timer(3000);
//         //     },
//         //     resetOnSuccess: true,
//         // }),
//         catchError(error => {
//             // terminalLog(error);

//             // return of('is not string');
//             // return EMPTY; // -|
//             // return NEVER; // -----------------------------------
//             // return throwError(() => 'error'); // -X
//             return NEVER; // -X
//         }),
//         // finalize(() => {
//         //     console.log('finalize');
//         // })
//     )
//     .subscribe({
//         next: terminalLog,
//         complete: () => {
//             terminalLog('COMPLETE');
//         },
//         error: error => {
//             terminalLog(error);
//         }
//     })