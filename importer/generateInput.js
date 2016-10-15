let promise = require('bluebird');
let csv = require('fast-csv');
let path = require('path');
let fs = require('fs');
let jsonfile = require('jsonfile');

function readData() {
    return new Promise(function (resolve, reject) {
        let result = [];

        var filePath = path.join(__dirname, 'data', 'imdb_list.csv');

        var fileReader = fs.createReadStream(filePath);

        csv
            .fromStream(fileReader, {headers: true})
            .on('data', function (data) {
                result.push({
                    id: data.const,
                    title: data.Title
                });
            })
            .on('error', function (err) {
                console.log(err);
            })
            .on('end', function () {
                resolve(result);
            });
    });
}

readData()
    .then((data) => {
        let filePath = path.join(__dirname, 'data', 'input.json');
        return jsonfile.writeFileSync(filePath, data);
    })
    .then(() => {
        console.log('Input file was generated!');
    })
    .catch((err) => {
        console.log(err);
    });