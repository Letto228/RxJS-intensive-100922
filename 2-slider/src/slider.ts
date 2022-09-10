import { start } from "@popperjs/core";
import { combineLatest, fromEvent, map, Observable, of, pipe, startWith, switchMap, tap } from "rxjs";

interface JQueryEvent {
    value: {
        newValue: number;
    }
};

interface ISliderParams {
    value: number;
    element: Element;
}

// Prod
function createSlider$(sliderId: string): Observable<ISliderParams> {
    const element = $(`#${sliderId}`).slider();

    return fromEvent<JQueryEvent>(element, 'change')
        .pipe(
            map(({delegateTarget, value}: any) => ({
                element: delegateTarget.previousElementSibling.querySelector('.slider-track'),
                value: value.newValue
            })),
            startWith({
                element: element.prev().get(0).querySelector('.slider-track') as Element,
                value: 5,
            }),
            tap(({element, value}) => {
                colorizeSliderByValue(element, value);
            })
        )
}

function colorizeSliderByValue(element: Element | null, sliderValue: number) {
    if (!element) {
        return;
    }

    element.classList.remove('bad', 'warn', 'good');

    if (sliderValue < 4) {
        element.classList.add('bad');

        return;
    }

    if (sliderValue <= 7) {
        element.classList.add('warn');

        return;
    }

    element.classList.add('good');
}

const buttonElement = document.getElementById('send-result') as HTMLElement;
const buttonClick$ = fromEvent(buttonElement, 'click')

combineLatest([
    createSlider$('quality'),
    createSlider$('rating'),
    createSlider$('actual'),
])
    .pipe(
        switchMap(([quality, rating, actual]) => buttonClick$.pipe(
            map(() => (quality.value + rating.value + actual.value) / 3)
        ))
    )
    .subscribe(console.log);


// Develop

// overengenering
// ___________________
// function colorizeSlider(jqueryElement: JQuery<HTMLElement>): (source$: Observable<number>) => Observable<number> {
//     const element = jqueryElement.prev().get(0).querySelector('.slider-track');

//     return (source$: Observable<number>): Observable<number> => {
//         return new Observable(subscriber => {
//             source$
//                 .pipe(
//                     tap(sliderValue => {
//                         colorizeSliderByValue(element, sliderValue);
//                     }),
//                 )
//                 .subscribe(subscriber);
//         })
//     }
// }
// _____________________

// function getNewValue(event: JQueryEvent): number {
//     return event.value.newValue;
// }

// const qualitySlider = $('#quality').slider();
// const ratingSlider = $('#rating').slider();
// const actualSlider = $('#actual').slider();

// const qualitySliderChange$ = fromEvent<JQueryEvent>(qualitySlider, 'change');
// const ratingSliderChange$ = fromEvent<JQueryEvent>(ratingSlider, 'change');
// const actualSliderChange$ = fromEvent<JQueryEvent>(actualSlider, 'change');

// qualitySliderChange$
//     .pipe(
//         map(getNewValue),
//         startWith(5),
//         colorizeSlider(qualitySlider),
//     )
//     .subscribe(console.log);
// ratingSliderChange$
//     .pipe(
//         map(getNewValue),
//         startWith(5),
//         colorizeSlider(ratingSlider),
//     )
//     .subscribe(console.log);
// actualSliderChange$
//     .pipe(
//         map(getNewValue),
//         startWith(5),
//         colorizeSlider(actualSlider),
//     )
//     .subscribe(console.log);