const Promise = require("bluebird");
const _ = require("lodash");
const axios = require("axios");
const jsonfile = require('jsonfile');

function importData() {
    const inputList = require('./input.json').input;

    let actions = [];
    let movies = [];
    let genres = [];
    let idCounter = 1;
    for (let input of inputList) {
        let action = axios.get(`http://www.omdbapi.com/?i=${input.id}&plot=short&r=json`)
            .then((response) => {
                let movieItem = getResultItem(response.data, idCounter++, input.id);

                for (let genre of movieItem.genres) {
                    if (!_.includes(genres, genre)) {
                        genres.push(genre);
                    }
                }

                movies.push(movieItem);
            });

        actions.push(action);
    }

    Promise.all(actions)
        .then(() => {
            let db = {
                genres,
                movies
            };

            return Promise.promisify(jsonfile.writeFile)('./importer/data/db.json', db);
        })
        .then(() => {
            console.log('Imported')
        })
        .catch((err) => {
            console.log(err);
        });
}

function getResultItem(data, resultId, inputId) {
    try {
        let item = {
            id: resultId,
            title: data.Title,
            year: data.Year,
            runtime: data.Runtime.substring(0, data.Runtime.length - 1 - 3),
            genres: data.Genre.split(', '),
            director: data.Director,
            actors: data.Actors,
            plot: data.Plot,
            posterUrl: data.Poster !== 'N/A' ? data.Poster : ''
        };

        return item;
    } catch (err) {
        console.log(`Error while importing movie with ID ${inputId}`);
        console.log(err);
    }
}

importData();


