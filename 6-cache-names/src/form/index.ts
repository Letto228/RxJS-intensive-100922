import { FormComponent } from './form.component';
import  './styles.css';

const firstForm = document.querySelector('.first-form') as HTMLInputElement;
const secondForm = document.querySelector('.second-form') as HTMLInputElement;

secondForm.hidden = true;

new FormComponent(firstForm);

setTimeout(() => {
    secondForm.hidden = false;

    new FormComponent(secondForm);
}, 6000)