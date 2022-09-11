import { map } from "rxjs";
import { TestScheduler } from "rxjs/testing"

// describe('Test exaple', () => {
//     let testScheduler: TestScheduler;

//     beforeEach(() => {
//         testScheduler = new TestScheduler((actual, expected) => {
//             expect(actual).toEqual(expected);
//         })
//     })

//     it('Map test', () => {
//         testScheduler.run(({
            
//         }) => {

//         })
//     })
// })

describe('Test exaple', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('cold test', () => {
        testScheduler.run(({
            cold,
            expectObservable,
        }) => {
            const stream$ = cold(
                '-a--b---c---|',
                {
                    a: 1,
                    b: 6,
                    c: 10,
                }
            );
            const finalStream$ = stream$.pipe(
                map(value => value * 2)
            );

            const expected = '-a--b---c---|';
            const expectedValue = {
                a: 2,
                b: 12,
                c: 20,
            };

            expectObservable(finalStream$).toBe(expected, expectedValue);
        })
    });

    it('hot test', () => {
        testScheduler.run(({
            hot,
            expectObservable,
        }) => {
            const stream$ = hot(
                '-a--b---c------d',
                {
                    a: 1,
                    b: 6,
                    c: 10,
                    d: 100,
                }
            );
            const finalStream$ = stream$.pipe(
                map(value => value * 2)
            );

            const sub =      '----^--------!'
            const expected = '----b---c----';
            const expectedValue = {
                a: 2,
                b: 12,
                c: 20,
                d: 200,
            };

            expectObservable(finalStream$, sub).toBe(expected, expectedValue);
        })
    })
})