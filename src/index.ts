import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators'

const myInput = document.querySelector('input');

const o = fromEvent(myInput, 'input');

o.pipe(switchMap(async (KeyboardEvent) => {
  const res = await fetch(`https://api.github.com/search/repositories?q=${(KeyboardEvent.currentTarget as HTMLInputElement).value}`);
  return res.json();
}), debounceTime(1000))
.subscribe(r => console.log(r.total_count));