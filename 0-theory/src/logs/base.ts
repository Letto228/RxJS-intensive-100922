// import { interval, Observable, Subscriber, Subscription } from 'rxjs';
// import '../../../assets/css/style.css';
// import { terminalLog } from '../../../utils/log-in-terminal';

// new Promise().then(() => 
//     new Promise().then(() => 
//         new Promise().then(() => 
//             ...
//         )
//     )
// )

// const interval = new Promise(resolve => {
//     let count = 0;

//     setInterval(() => {
//         console.log(count);
//         resolve(++count);
//     }, 1000);
// });

// interval.then(value => console.log(value));
// interval.then(console.log);

// setTimeout(() => {
//     interval.then(console.log);
// }, 2000);

// const interval = function* intervalFn() {
//     let count = 0;

//     while (true) {
//         yield ++count;
//     }
// }()

// console.log(interval.next().value);
// console.log(interval.next().value);

// setTimeout(() => {
//     console.log(interval.next().value);
// }, 2000);

// const interval$: Observable<number> = interval(1000);
// const interval$ = new Observable((subscriber: Subscriber<number>) => {
//     let count = 0;

//     subscriber.next(count);

//     console.log('START');

//     const intervalId = setInterval(() => {
//         count += 1;

//         if (count === 5) {
//             subscriber.complete();

//             return;
//         }

//         console.log('interval', count);
//         subscriber.next(count);
//     }, 1000);

//     return () => {
//         clearInterval(intervalId);
//     }
// });

// setTimeout(() => {
//     const subscription = new Subscription();

//     subscription.add(interval$.subscribe({
//         next: count => {
//             terminalLog(`firstSubscription - ${count}`);
//         },
//         complete: () => {
//             terminalLog('firstSubscription - COMPLETED');
//         },
//         error: error => {
//             terminalLog(`firstSubscription - ${error}`);
//         },
//     }))

//     setTimeout(() => {
//         subscription.add(interval$.subscribe({
//             next: count => {
//                 terminalLog(`secondSubscription - ${count}`);
//             },
//             complete: () => {
//                 terminalLog('secondSubscription - COMPLETED');
//             },
//             error: error => {
//                 terminalLog(`secondSubscription - ${error}`)
//             },
//         }));

//         setTimeout(() => {
//             subscription.unsubscribe();
//         }, 2000);

//         setTimeout(() => {
//             // secondSubscription.unsubscribe();
//         }, 1000);
        
//         setTimeout(() => {
//             // firstSubscription.unsubscribe();
//         }, 2000);

//     }, 1000)
// }, 3000)

// const ws = new WebSocket('ws://localhost:8081');

// ws.onopen = () => {
//     ws.send('on');
// }

// const wsMessage$ = new Observable<MessageEvent>(subscriber => {
//     console.log('START');

//     function messageListener(message: MessageEvent) {
//         subscriber.next(message);
//     }

//     function closeListener() {
//         subscriber.complete();
//     }

//     ws.addEventListener('message', messageListener);
//     ws.addEventListener('close', closeListener);

//     return () => {
//         ws.removeEventListener('message', messageListener);
//         ws.removeEventListener('close', closeListener);

//         console.log('RIP')
//     }
// });

// wsMessage$.subscribe(value => {
//     terminalLog(`First - ${value.data}`);
// });
// wsMessage$.subscribe(value => {
//     terminalLog(`Second - ${value.data}`);
// });

// setTimeout(() => {
//     wsMessage$.subscribe(value => {
//         terminalLog(`Last - ${value.data}`);
//     })
// }, 4000);

// setTimeout(() => {
//     ws.send('off');
// }, 10000);

// setTimeout(() => {
//     ws.close();
// }, 12000);