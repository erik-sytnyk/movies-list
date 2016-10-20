import moviesData from '../../db.json';

export default {
    getMovies,
    deleteMovie,
    saveMovie,
    getGenres
};

const pageSize = 10;

function getMovies(page, sortBy, searchStr) {
    let movies = searchMovies(moviesData.movies, searchStr);

    sortMovies(movies, sortBy);

    let result = getPage(movies, page, pageSize);

    return Promise.resolve({
        total: movies.length,
        dataItems: result
    });
}

function sortMovies(movies, sortBy) {
    if (sortBy === 'title') {
        movies.sort((x, y) => x.title.localeCompare(y.title));
    }

    if (sortBy === 'year') {
        movies.sort((x, y) => x.year - y.year);
    }

    if (sortBy === 'runtime') {
        movies.sort((x, y) => x.runtime - y.runtime);
    }
}

function searchMovies(movies, searchStr) {
    if (!searchStr) return movies;

    let textSearchFields = ['title', 'year', 'actors', 'director', 'plot'];

    return movies.filter(movie => {
        for (let field of textSearchFields) {
            if (containsString(movie[field], searchStr)) return true;
        }

        for (let genre of movie.genres) {
            if (containsString(genre, searchStr)) return true;
        }

        return false;
    });
}

function containsString(obj, searchStr) {
    return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
}

function getPage (movies, page, perPage) {
    var start = (page - 1) * perPage;
    var end = page * perPage;
    return movies.slice(start, end);
}

function deleteMovie(id) {
    let movies = moviesData.movies;

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === id) {
            movies.splice(i, 1);
        }
    }

    return Promise.resolve(null);
}

function saveMovie(movie) {
    if (movie.id) return updateMovie(movie);

    return addMovie(movie);
}

function updateMovie(movie) {
    let movies = moviesData.movies;

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === movie.id) {
            movies[i] = movie;
        }
    }

    return Promise.resolve(null);
}

function addMovie(movie) {
    let movies = moviesData.movies;

    let maxId = 0;

    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id > maxId) {
            maxId = movies[i].id;
        }
    }

    movie.id = maxId + 1;

    movies.push(movie);

    return Promise.resolve(null);
}

function getGenres() {
    return Promise.resolve(moviesData.genres);
}