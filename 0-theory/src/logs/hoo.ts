// const interval500 = interval(500);
// const interval1000 = interval(1000);

// const stream$ = timer(2000, 300).pipe(
//     take(8),
//     exhaustMap(() => ajax({
//         url: `https://learn.javascript.ru/courses/groups/api/participants?key=1lesw5i`,
//         crossDomain: true,
//         method: 'GET',
//     })),
//     // map(value => value % 2 ? interval1000 : interval500),
//     // switchAll(),
//     // mergeMap(), // mergeAll() + map(),
//     // switchMap(), // switchAll() + map(),
//     // concatMap(), // concatAll() + map(),
//     // exhaustMap(), // exhaustAll() + map(),
// );

// stream$.subscribe(vlaue => {
//     console.log(vlaue);
// });

// interval(1000).pipe(
//     // switchMap(() => of(
//     //     1,
//     //     2,
//     //     3,
//     //     4,
//     //     5,
//     // )),
//     switchMap(() => [
//         1,
//         2,
//         3,
//         4,
//         5,
//     ]),
// ).subscribe(console.log);