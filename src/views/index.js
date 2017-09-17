// require('./scss/index.scss')
// require('./scss/school.scss')

var m = require("mithril")
var layout = require('./layout')
m.route(document.body, "/", {
    "/": {
        onmatch: function () {

        },
        render: function () {
            return m(layout)
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