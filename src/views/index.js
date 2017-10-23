// require('./scss/index.scss')
// require('./scss/school.scss')

var m = require("mithril")
var layout = require('./layout')
var a = require('./a')
m.route(document.body, "/", {
    "/": {
        onmatch: function () {

        },
        render: function () {
            return m(layout, m(a))
        }
    },
    "/b": {
        onmatch: function () {

        },
        render: function () {
            return m(layout, "this is b")
        }
    },
    // "/alert": {
    //     onmatch: function () {
    //         return new Promise(function (resolve) {
    //             require(["./alert"], resolve);
    //         })
    //     },
    //     render: function (v) {
    //         return m(v.tag)

    //     }
    // },
})

if (module.hot) {
    // 模块自己就接收更新
    module.hot.accept();
    // dispose方法用来定义一个一次性的函数，这个函数会在当前模块被更新之前调用
    // module.hot.dispose(function () {
    //     Component = {};
    //     console.log(Component)
    // });
}