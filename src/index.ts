import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators'

const myInput = document.querySelector('input');

const o = fromEvent(myInput, 'input');

o.pipe(switchMap(async (KeyboardEvent) => {
  const res = await fetch(`https://gitlab.com/api/v4/projects?search=${(KeyboardEvent.currentTarget as HTMLInputElement).value}`);
  return res.headers.get('X-Total');
}), debounceTime(1000))
.subscribe(r => console.log(r));