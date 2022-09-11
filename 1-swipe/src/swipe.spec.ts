import { zip } from "rxjs";
import { TestScheduler } from "rxjs/testing";
import { getXPosition$ } from "./swipe";

function createEvent(x: number): TouchEvent {
    return new TouchEvent('event', {
        changedTouches: [new Touch({clientX: x, identifier: 1, target: new EventTarget()})]
    })
}

describe('Test exaple', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        })
    })

    it('swipe', () => {
        testScheduler.run(({
            cold,
            expectObservable
        }) => {
            const stream$ = cold(
                '-a----b----------|',
                {
                    a: createEvent(2),
                    b: createEvent(30),
                }
            );
            const additionalStream$ = cold(
                '---a-----b----c--|',
                {
                    a: createEvent(20),
                    b: createEvent(3),
                    c: createEvent(10),
                }
            );
            const swipe$ = zip(getXPosition$(stream$), getXPosition$(additionalStream$));

            const expected = '---a-----b-------|';
            const expectedValue = {
                a: [2, 20],
                b: [30, 3],
            }

            expectObservable(swipe$).toBe(expected, expectedValue);
        })
    })
})