$(function() {

function presentation(rules) {
    console.log(typeof rules);
    var timestamp = '_' + new Date().getTime() + '_';
    var ss = document.createElement('STYLE');
    ss.type = 'text/css';
    rules = rules.replace(/#/g, '#' + timestamp);
    rules = rules.replace(/[.]/g, '.' + timestamp);
    rules = rules.replace(/;/g, ' !important;');
    if (ss.styleSheet) {
        ss.styleSheet.cssText = rules;
    } else {
        ss.appendChild(document.createTextNode(rules));
    }
    $('head').append(ss);
    $('main').html('<p>' + rules + '</p>');
}


// $.ajax({
//     url: 'style.css',
//     success: function(res) {
//         console.log(res);
//         presentation(res);
//     },
//     error: function(res) {
//         console.log('error', res);
//     }
// });


    // var fn = function(str) {
    //     if (typeof str !== 'string') throw "Mismatched type error";
    //     this.str = str + ' is a string';
    //     return this;
    // }

    // fn.prototype.concat = function() {
    //     return this.str + ' concatinated!!';
    // }

    // console.log(new fn('test').concat());

});

