import { bufferCount, concatAll, map, pipe, reduce } from "rxjs";
import { ICard } from "./card.interface";

// export const requestToHtmlString = pipe( // Observable<ICard[]>
//     concatAll(), // Observable<ICard[]> -> Observable<ICard>
//     map(createCard), // Observable<ICard> -> Observable<string>
//     bufferCount(3), // Observable<string> -> Observable<[string, string, string]>
//     map(createRow),
//     reduce(
//         (resultString: string, row: string) => resultString + row,
//         ''
//     )
// )

export function requestToHtmlString(cards: ICard[]): string {
    const cardToHtml = cards.map(createCard);

    const groupedCard = cardToHtml.reduce(
        (groups: Array<string[]>, cardToHtml: string) => {
            const groupsLastIndex = groups.length - 1;

            if (groups[groupsLastIndex].length < 3) {
                groups[groupsLastIndex].push(cardToHtml);

                return [...groups]
            }

            return [...groups, [cardToHtml]]
        },
        [[]],
    );
    const groupedCardRow = groupedCard.map(createRow);

    return groupedCardRow.reduce(
        (resultString: string, row: string) => resultString + row,
        ''
    )

}

function createCard({name, description, owner}: ICard): string {
    return `
    <div class="col-sm-6 col-md-4">
        <div class="card">
            <img class="card-img" src=${owner.avatar_url} alt=${name}>
            <div class="card-body">
                <h3 class="card-title">${name}</h3>
                <p class="card-text">${description}</p>
            </div>
        </div>
    </div>
    `;
}

function createRow(htmlStrings: string[]): string {
    return `<div class="row">${htmlStrings.join(' ')}</div>`;
}