import { Observable } from 'rxjs';

const myObs = {
  subscriptions: [],
  value: -1,
  subscribe: function (sub: any) {
    this.subscriptions.push(sub);
  },
  next: function (v: number) {
    this.value = v;
    this.subscriptions.forEach((sub) => sub(v));
  }
};

myObs.subscribe((data) => console.error(data));
myObs.next(13);

// Create observable
const helloWorld$ = new Observable(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  //   observer.error(new Error('Help. is doof alles hier'));
  observer.next(4);
  observer.complete();
  observer.next(5);
});

// Subscribe to an observable
helloWorld$.subscribe({
  next(x) {
    console.log(x);
  },
  error(err) {
    console.error(err);
  },
  complete() {
    console.log('done');
  }
});
