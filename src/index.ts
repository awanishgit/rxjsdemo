import { Observable, of, from } from 'rxjs';
import { map, delay, mergeAll, mergeMap, switchAll, switchMap, concatMap } from 'rxjs/operators';

var observable = Observable.create((observer: any) => {
    observer.next('Hello World!');
    observer.next('Hello Again!');
    observer.complete();
    observer.next('Bye');
})
observable.subscribe(
    (x: any) => logItem(x),
    (error: any) => logItem('Error: ' + error),
    () => logItem('Completed')
);
function logItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("list").appendChild(node);
}

// const source = of('World');

// source.subscribe(
//     x => {
//         console.log(x);

//     }
// );

// const source = of('World').pipe(
//     map(x => { return `Hello ${x}` })
// );

// source.subscribe(
//     x => console.log(x)
// )

const data = of([
    {
        brand: 'porsche',
        model: '911'
    },
    {
        brand: 'porsche',
        model: 'macan'
    },
    {
        brand: 'ferarri',
        model: '458'
    },
    {
        brand: 'lamborghini',
        model: 'urus'
    }
]);


const carObservable = data.pipe(
    map(cars => cars.map(car => `${car.brand} ${car.model}`))
);

carObservable.subscribe(
    car => console.log(car)
)

// MergeMap if we need to fetch data from server of each item of array which return result as an observable
const arrayData = of([1, 2, 3, 4]);

const getData = (param: any) => {
    return of(`retrived new data with param ${param}`).pipe(
        delay(1000)
    )
}

// Using simple inner and outer observable subscription

arrayData.pipe(
    map(param => getData(param))
).subscribe(
    data => data.subscribe(value => console.log(value))
);


// Using map and mergeAll

arrayData.pipe(
    map(param => getData(param)),
    mergeAll()
).subscribe(val => console.log(val));

// Using mergeMap

arrayData.pipe(
    mergeMap(param => getData(param))
).subscribe(val => console.log(val));

// using map and switchAll

arrayData.pipe(
    map(param => getData(param)),
    switchAll()
).subscribe(val => console.log(val));

arrayData.pipe(
    switchMap(param => getData(param))
).subscribe(val => console.log(val));

arrayData.pipe(
    concatMap(param => getData(param))
).subscribe(val => console.log('concatMap:', val));






