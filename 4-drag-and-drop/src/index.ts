import '../../assets/css/style.css';
import  './styles.css';
import {drag} from './drag-and-drop';
import { fromEvent } from 'rxjs';

const box = document.querySelector('.draggable') as HTMLElement;

const sourceMouseDown$ = fromEvent<MouseEvent>(box, 'mousedown');
const sourceMouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
const sourceMouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');

drag(
    sourceMouseDown$,
    sourceMouseMove$,
    sourceMouseUp$,
).subscribe(({left, top}) => {
    box.style.left = `${left}px`
    box.style.top = `${top}px`
})