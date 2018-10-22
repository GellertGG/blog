function* gen(x) {
    var y = yield x + 2 + f();
    return y;
}

function f() {
    console.log("wq");
    return 4;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() //
