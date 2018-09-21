/**-----------------------------------------------------------------------------------------------------------
  * The CanvasRenderingContext2D.beginPath() method of the Canvas 2D API starts a new path by emptying the list
  *  of sub-paths. Call this method when you want to create a new path.
  * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
  * -----------------------------------------------------------------------------------------------------------
  * combineLatest
  * When any observable emits a value, emit the latest value from each.
  * -----------------------------------------------------------------------------------------------------------
  * zip
  * After all observables emit, emit values as an array.
  -----------------------------------------------------------------------------------------------------------*/
import { fromEvent, combineLatest, Observable } from 'rxjs';
import { tap, map, startWith, switchMap, zip, skip, merge } from 'rxjs/operators';

const colorSelect = document.querySelectorAll('#js-color-chart tr td');
const canvas = document.querySelector('#js-scratchpad');
const ctx = canvas.getContext('2d');
ctx.beginPath();

const mouseUp$ = fromEvent(canvas, 'mouseup');
const mouseDown$ = fromEvent(canvas, 'mousedown');
const mouseMove$ = fromEvent(canvas, 'mousemove');

/**-----------------------------------------------------------------------------------------------------------
 * For each color select, create a new path on canvas and emit the newly selected color.
 -----------------------------------------------------------------------------------------------------------*/
const colorClick$ = fromEvent(colorSelect, 'click').pipe(
  tap(_ => ctx.beginPath()),
  map(e => e.target.bgColor),
  startWith('#000000')
)

/**-----------------------------------------------------------------------------------------------------------
 * Emit offsets for consecutive mousemove events.
 -----------------------------------------------------------------------------------------------------------*/
const mouseMoveDiff$ = mouseMove$.pipe(
  zip(
    mouseMove$.pipe(
      skip(1)
    )
  ),
  map(eventOffsets)
);

/**-----------------------------------------------------------------------------------------------------------
 * If mouse is down, emit mouse movement offset stream,
 * Else, emit nothing via an observable which does not emit anything.
 -----------------------------------------------------------------------------------------------------------*/
const eligibleMouseMovement$ = mouseUp$.pipe(
  map(_ => false),
  merge(
    mouseDown$.pipe(
      map(_ => true)
    )
  ),
  switchMap(
    encodedValue => encodedValue ? mouseMoveDiff$ : Observable.create(_ => { })
  )
);

/**-----------------------------------------------------------------------------------------------------------
 * Emit combined data when both color and mouse movement offset information is available.
 -----------------------------------------------------------------------------------------------------------*/
combineLatest(colorClick$, eligibleMouseMovement$).subscribe(([color, pos]) => canvasUpdate(color, pos))

// -----------------------------------------------------------------------------------------------------------
function eventOffsets([e1, e2]) {
  return { first: getOffset(e1), second: getOffset(e2) };
  function getOffset(event) {
    return {
      offsetX: event.offsetX === undefined ? event.layerX : event.offsetX,
      offsetY: event.offsetY === undefined ? event.layerY : event.offsetY
    };
  }
}

function canvasUpdate(color, pos) {
  ctx.strokeStyle = color;
  ctx.moveTo(pos.first.offsetX, pos.first.offsetY);
  ctx.lineTo(pos.second.offsetX, pos.second.offsetY);
  ctx.stroke();
}
// -----------------------------------------------------------------------------------------------------------
