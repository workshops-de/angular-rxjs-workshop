import { Observable, timer } from 'rxjs';

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

const subT = timer(5000, 2000).subscribe((data) => console.log(data));
setTimeout(() => {
  subT.unsubscribe();
}, 15000);

// Create observable
const helloWorld$ = new Observable(function subscribe(observer) {
  const interv = setInterval((i) => observer.next(i), 1500);
  return function unsubscribe() {
    clearInterval(interv);
  };
  //   observer.next(2);
  //   observer.next(3);
  //   //   observer.error(new Error('Help. is doof alles hier'));
  //   observer.next(4);
  //   observer.complete();
  //   observer.next(5);
});

// Subscribe to an observable
// const mySub = helloWorld$.subscribe({
//   next(x) {
//     console.log(x);
//   },
//   error(err) {
//     console.error(err);
//   },
//   complete() {
//     console.log('done');
//   }
// });
// setTimeout(() => {
//   mySub.unsubscribe();
// }, 5000);
