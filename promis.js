// let promise = new Promise(function (resolve, reject) {
//     console.log("test");
//     resolve("test");
//     console.log(1222)
//     // setTimeout(function () {
//     //
//     // }, 2000);
// });
// console.log("222");
// let a = promise.then(function (value) {
//     console.log(value);
// },function (err) {
//     console.log(err);
// });
// a.then(function (val) {
//     console.log(val);
// })
// console.log("33333");

// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve(1111);
//     }, 3000)
// })
//
// const p2 = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         resolve(p1);
//     }, 1000)
// })
//
// p2.then(function (val) {
//     console.log(val);
// })


// let promise = new Promise(function (resolve, reject) {
//    reject(new Error("test"));
// });
// promise.then(function () {
//
// }).catch(function (err) {
//     console.log(err.message);
// }).finally(function () {
//     console.log(1212);
// });

// setTimeout(() => { console.log(123) }, 2000);


function getFoo () {
    // return 123;
    return new Promise(function (resolve, reject){
        resolve('foo');
    });
}

const g = function* () {
    try {
        const foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
};

function run (generator) {
    const it = generator();

    function go(result) {
        if (result.done) return result.value;

        return result.value.then(function (value) {
            return go(it.next(value));
        }, function (error) {
            return go(it.throw(error));
        });
    }

    go(it.next());
}

run(g);
