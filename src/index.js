/**-----------------------------------------------------------------------------------------------------------
 * ADD YOUR JS CODE HERE.
 -----------------------------------------------------------------------------------------------------------*/
import {Observable, fromEvent, from, of, interval, forkJoin, throwError } from 'rxjs';
import {map, filter, reduce, merge, mapTo, delay, catchError, mergeMap} from 'rxjs/operators';

/**-----------------------------------------------------------------------------------------------------------
 * OBSERVABLE API DEMO
 * - Observables are cancellable (can be disposed).
 -----------------------------------------------------------------------------------------------------------*/
// let myObservable = new Observable(observer => {
//   let count = 0;
//   let interval = setInterval(() => {
//     observer.next(count++);
//   }, 100);
//   //disposal function
//   return () => {
//     clearInterval(interval);
//   }
// });

// let subscriber = myObservable.subscribe(
//   val => console.log(val),
//   err => console.log(err),
//   _ => console.log('done')
// );

// setTimeout(() => {
//   subscriber.unsubscribe();
// }, 500);

/**-----------------------------------------------------------------------------------------------------------
 * CREATING OBSERVABLES
 -----------------------------------------------------------------------------------------------------------*/

/**-----------------------------------------------------------------------------------------------------------
 * CREATE
 * Create an observable with given subscription function.
 -----------------------------------------------------------------------------------------------------------*/
// const hello = Observable.create(function(observer) {
//   observer.next('Hello');
//   observer.next('World');
// });
// hello.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * FROM
 * Turn an array, promise, or iterable into an observable.
 -----------------------------------------------------------------------------------------------------------*/
// const arraySource = from([1, 2, 3, 4, 5]);
// arraySource.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * FROMEVENT
 * Turn event into observable sequence.
 -----------------------------------------------------------------------------------------------------------*/
// const source = fromEvent(document, 'click')
// source.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * OF
 * Emit variable amount of values in a sequence.
 -----------------------------------------------------------------------------------------------------------*/
// const source = of({ name: 'Brian' }, [1, 2, 3], function hello() {
//   return 'Hello';
// });
// source.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * MANIPULATING OBSERVABLE STREAMS
 -----------------------------------------------------------------------------------------------------------*/

/**-----------------------------------------------------------------------------------------------------------
* MAP
* Apply projection with each value from source.
-----------------------------------------------------------------------------------------------------------*/
// const source = from([1, 2, 3, 4, 5]);
// const example = source.pipe(map(val => val + 10));
// example.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * FILTER
 * Emit values that pass the provided condition.
 -----------------------------------------------------------------------------------------------------------*/
// const source = from([1, 2, 3, 4, 5]);
// const example = source.pipe(filter(num => num % 2 === 0));
// example.subscribe(val => console.log(`Even number: ${val}`));

/**-----------------------------------------------------------------------------------------------------------
 * REDUCE
 * Reduces the values from source observable to a single value that's emitted when the source completes.
 -----------------------------------------------------------------------------------------------------------*/
// const source = of(1, 2, 3, 4);
// const example = source.pipe(reduce((acc, val) => acc + val));
// example.subscribe(val => console.log('Sum:', val));

/**-----------------------------------------------------------------------------------------------------------
 * MERGE
 * Turn multiple observables into a single observable.
 -----------------------------------------------------------------------------------------------------------*/
// const first = interval(2500).pipe(mapTo('FIRST'));
// const second = interval(1000).pipe(mapTo('SECOND'));
// const example = first.pipe(merge(second));
// example.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * FORKJOIN
 * When all observables complete, emit the last emitted value from each.
 * Similar to Promise.all
 -----------------------------------------------------------------------------------------------------------*/
// const example = forkJoin(
//   of('Hello'),
//   of('World').pipe(delay(1000)),
//   throwError('This will error').pipe(catchError(error => of(error)))
// );
// example.subscribe(val => console.log(val));

/**-----------------------------------------------------------------------------------------------------------
 * MERGEMAP
 * Map to observable, emit values.
 -----------------------------------------------------------------------------------------------------------*/
// const source = of('Hello');

// const myPromise = val => new Promise(resolve => resolve(`${val} World From Promise!`));
// const example = source.pipe(
//   mergeMap(
//     val => myPromise(val),
//     (valueFromSource, valueFromPromise) => {
//       return `Source: ${valueFromSource}, Promise: ${valueFromPromise}`;
//     }
//   )
// );

// example.subscribe(val => console.log(val));
/**-----------------------------------------------------------------------------------------------------------
 * SWITCH MAP -- AUTOCOMPLETE DEMO
 * -----------------------------------------------------------------------------------------------------------*/
