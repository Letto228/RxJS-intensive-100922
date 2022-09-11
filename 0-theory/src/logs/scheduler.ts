// of(...Array.from({length: 9999}).map((_, i) => i)) // macro
//     .subscribe(console.log);
// of(...Array.from({length: 9999}).map((_, i) => i), asyncScheduler) // macroTask ~ setTimeout
//     .subscribe(console.log);
// of(...Array.from({length: 9999}).map((_, i) => i), asapScheduler) // microTask ~ Promise.resolve
//     .subscribe(console.log);

// merge(
//     of(...Array.from({length: 9}).map((_, i) => i + 10))
//         .pipe(
//             observeOn(asyncScheduler),
//             tap(() => {
//                 console.log('by function 1')
//             }),
//             observeOn(asyncScheduler),
//         ),
//     of(...Array.from({length: 9}).map((_, i) => i))
//         .pipe(
//             tap(() => {
//                 console.log('by function 2')
//             }),
//         ),
// ).subscribe(value => console.log(value));

// combineLatest([
//     // scheduled(of(1, 3), asyncScheduler), // of(..., scheduler) // 12--
//     of(1, 3).pipe(observeOn(asyncScheduler)), // of(..., scheduler) // 12--
//     of(10), // 10--
// ]).subscribe(console.log);
