var json2html = require("node-json2html");

let data = {
    "name": "daniel",
    "age": 34,
};
let transform = {
    
};
let html = json2html.transform(data, transform);
console.log(html.split('><').join('>\n<'));

