/**-----------------------------------------------------------------------------------------------------------
 * The imperative way!
 -----------------------------------------------------------------------------------------------------------*/
import { getItems } from './library';
import $ from 'jquery';
const $input = $('#js-input')
const $results = $('#js-results')

let lastQuery = null;
let lastTimeout = null;
let nextQueryId = 0;

$input.on('input', e => {
  const title = e.target.value;
  if (title === lastQuery) {
    return
  }
  lastQuery = title
  if (lastTimeout) {
    window.clearTimeout(lastTimeout)
  }
  let ourQueryId = ++nextQueryId;
  lastTimeout = setTimeout(() => {
    getItems(title).then(items => {
      if (ourQueryId !== nextQueryId) {
        return
      }
      $results.empty().append(items.map(i => `<div>${i}</div>`));
    })
  }, 500);
})










/**-----------------------------------------------------------------------------------------------------------
 * The reactive way!
 * -----------------------------------------------------------------------------------------------------------
 * switchMap
 * On each emission the previous inner observable (the result of the function you supplied) is cancelled and
 * the new observable is subscribed.
 * -----------------------------------------------------------------------------------------------------------
 * distinctUntilChanged
 * Only emit when the current value is different than the last.
 * -----------------------------------------------------------------------------------------------------------
 * debounceTime
 * Discard emitted values that take less than the specified time between output
 * -----------------------------------------------------------------------------------------------------------*/
// import { fromEvent } from 'rxjs';
// import $ from 'jquery';
// import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
// import { getItems } from './library';

// const $input = $('#js-input')
// const $results = $('#js-results')

// fromEvent($input, 'input').pipe(
//   map(e => e.target.value),
//   distinctUntilChanged(),
//   debounceTime(500),
//   switchMap(getItems)
// ).subscribe(items => {
//   $results.empty().append(items.map(i => `<div>${i}</div>`));
// })

