var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res) {
    var arr = fs.readFileSync(__dirname + "/../data.json");

    var templateName = (!req.query.t ? 'index' : ('index'+req.query.t));
    res.render(templateName, { bingo: JSON.stringify(shuffle(JSON.parse(arr.toString("utf-8")).bingo)) });
};

exports.index2 = function(req, res) {
    req.query.t = '2';
    exports.index(req, res);
};

exports.index3x3 = function(req, res) {
    req.query.t = '3x3';
    exports.index(req, res);
};

function shuffle(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}