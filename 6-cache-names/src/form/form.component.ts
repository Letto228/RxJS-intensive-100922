import { combineLatest, debounceTime, fromEvent, map, Observable, tap, withLatestFrom } from "rxjs";
import { userService } from "./user.service";

export class FormComponent {
    private input!: HTMLInputElement;
    private button!: HTMLButtonElement;
    private nameSequence$!: Observable<string>;

    constructor(formContainer: HTMLElement) {
        this.input = formContainer.querySelector('input') as HTMLInputElement;
        this.button = formContainer.querySelector('button') as HTMLButtonElement;

        const inputValue$ = fromEvent<InputEvent>(this.input, 'input').pipe(
            map(({target}) => (target as HTMLInputElement).value),
            debounceTime(300),
        )

        this.nameSequence$ = combineLatest([ // Observable<[string, string[]]>
            inputValue$,
            userService.uniqueNameSequence$,
        ]).pipe(
            tap(([text, names]) => {
                const isValid = names.includes(text);
                console.log(
                    names,
                    text,
                )

                this.button.disabled = !isValid;

                if (!isValid) {
                    this.input.classList.add('error');
                    
                    return;
                }

                this.input.classList.remove('error');
            }),
            map(([text]) => text),
        )

        // Подумать над отпиской
        fromEvent(this.button, 'click')
            .pipe(
                withLatestFrom(this.nameSequence$),
            )
            .subscribe(([_clickEvent, name]) => {
                console.log(name);
            })
    }
}