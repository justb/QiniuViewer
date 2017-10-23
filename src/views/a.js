import m from 'mithril'
var Component = {
    oninit: function(){
        console.log(123)
    },
    view: function () {
        return m("",{
            onclick: function(){
                m.route.set("/",null, { replace: true })
            }
        },"ha123123123hh")
    }
}

module.exports = Component