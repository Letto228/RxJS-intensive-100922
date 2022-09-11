import { TestScheduler } from "rxjs/testing";
import { skipLimit } from "./skip-limit";

describe('Test exaple', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('Skip limit test', () => {
        testScheduler.run(({
            cold,
            expectObservable,
        }) => {
            const stream$ = cold(
                '-a--b----c----d---|',
                {
                    a: 1,
                    b: 2,
                    c: 100,
                    d: 10,
                    e: 50,
                }
            );
            const expected = '----b----c--------|'
            const expectedValue = {
                b: 2,
                c: 100,
                e: 50,
            }

            expectObservable(stream$.pipe(skipLimit(1, 2))).toBe(expected, expectedValue)
        })
    })
})