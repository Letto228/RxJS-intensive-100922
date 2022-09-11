import 'bootstrap';
import { fromEvent, map } from 'rxjs';
import '../../assets/css/style.css';
import { ICard } from './card.interface';
import { liveSearch } from './live-search';
import { requestToHtmlString } from './request-to-html-string';
import  './styles.css';

const inputElement = document.getElementById('search') as HTMLElement;
const containerElement = document.querySelector('.container') as HTMLElement;

fromEvent<InputEvent>(inputElement, 'input')
    .pipe(
        map(({target}) => (target as HTMLInputElement).value),
        liveSearch<{items: ICard[]}>(q => `https://api.github.com/search/repositories?q=${q}`),
        map(({items}) => requestToHtmlString(items)),
    )
    .subscribe(htmlString => {
        console.log(htmlString);
        containerElement.innerHTML = htmlString;
    });