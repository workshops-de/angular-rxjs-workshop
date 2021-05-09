import { Observable } from 'rxjs';

playground1();

function playground1() {
  const stream$ = new Observable((observer) => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.next(4);
    observer.next(5);
    observer.error(new Error('Something went wrong'));
    observer.complete();
  });

  stream$.subscribe({
    next: (value) => console.log(value),
    complete: () => console.log('Stream is complete! 😎')
  });
}
