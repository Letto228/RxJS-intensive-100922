import { AsyncSubject, map, Observable, ReplaySubject, share, shareReplay, Subject } from "rxjs";
import { ajax } from "rxjs/ajax";
import { IUser } from "./user.interface";

class UserService {
    uniqueNameSequence$: Observable<string[]> = ajax<IUser[]>({
        url: 'https://learn.javascript.ru/courses/groups/api/participants?key=1lesw5i',
        crossDomain: true,
        method: 'GET',
    }).pipe(
        map(({response}) => response.map(({profileName}) => profileName)),
        share({
            connector: () => {
                return new AsyncSubject()
            },
            resetOnComplete: false,
            resetOnError: false,
            resetOnRefCountZero: false,
        }),
    )
}

export const userService = new UserService();