import { asapScheduler, asyncScheduler, AsyncSubject, BehaviorSubject, catchError, combineLatest, concatAll, concatMap, Connectable, ConnectableObservable, count, defer, delay, EMPTY, exhaustAll, exhaustMap, filter, finalize, from, iif, interval, map, merge, mergeAll, mergeMap, multicast, NEVER, Observable, observeOn, of, pipe, pluck, publish, queueScheduler, refCount, ReplaySubject, retry, RetryConfig, retryWhen, scheduled, share, skip, startWith, Subject, subscribeOn, Subscriber, Subscription, switchAll, switchMap, take, tap, throwError, timer, zip } from 'rxjs';
import { ajax, AjaxConfig } from 'rxjs/ajax';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';

