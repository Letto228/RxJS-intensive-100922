// const subject = new ReplaySubject<number>(3);

// const obs = new Observable<number>(subscriber => {
//     console.log('CREATED');
//     let count = 0

//     const id = setInterval(() => {
//         subscriber.next(++count)
//     }, 1000)

//     return () => {
//         clearInterval(id);
//     }
// })

// const stream$ = interval(1000).pipe(
//     // multicast(subject),
//     // publish(), // publish = multicast + subject
//     // refCount(),
//     share({ // share = publish() + refCount()
//         connector: () => new BehaviorSubject<number>(9999),
//         resetOnComplete: false,
//         resetOnError: false,
//         resetOnRefCountZero: true,
//     }),
// );

// (stream$ as ConnectableObservable<number>).connect();

// const sub = stream$.subscribe(value => {
//     terminalLog('Sub 1 - ' + value);
// })

// setTimeout(() => {
//     sub.add(stream$.subscribe(value => {
//         terminalLog('Sub 2 - ' + value);
//     }))
// }, 5000)
// setTimeout(() => {
//     sub.unsubscribe()
// }, 6000)
// setTimeout(() => {
//     const sub = stream$.subscribe(value => {
//         terminalLog('Sub 1 - ' + value);
//     })
// }, 8000)