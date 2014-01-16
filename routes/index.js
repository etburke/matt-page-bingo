var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res) {
    var arr = fs.readFileSync(__dirname + "/../data.json");

    res.render('index', { bingo: JSON.stringify(shuffle(JSON.parse(arr.toString("utf-8")).bingo)) });
};

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}