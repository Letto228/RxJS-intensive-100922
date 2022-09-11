import { interval, take } from 'rxjs';
import '../../assets/css/style.css';
import {skipLimit} from './skip-limit';

interval(1000).pipe(take(10), skipLimit(2, 2)).subscribe(console.log);
