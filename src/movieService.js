import toastr from 'toastr';

export default {
    getMovies,
    deleteMovie,
    updateMovie,
    getGenres
};

function getMovies(page, sortBy, searchStr) {
    if (!searchStr) searchStr = '';

    return fetch(`/movies?_page=${page}&_sort=${sortBy}&q=${searchStr}`)
        .then((response) => {
            checkStatus(response);

            return response.json()
                .then((jsonData) => {
                    return {
                        total: response.headers.get('x-total-count'),
                        dataItems: jsonData
                    }
                });
        })
        .catch((err) => {
            toastr.error(err);
        });
}

function deleteMovie(id) {
    return fetch(`/movies/${id}`, {method: 'DELETE'})
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            toastr.error(err);
        });
}

function updateMovie(movie) {
    let request = new Request(`/movies/${movie.id}`, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PATCH',
        body: JSON.stringify(movie)
    });

    return fetch(request)
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            toastr.error(err);
        });
}

function getGenres() {
    return fetch(`/genres`)
        .then((response) => {
            checkStatus(response);

            return response.json();
        })
        .catch((err) => {
            toastr.error(err);
        });
}

function checkStatus(response) {
    if (!response.ok) throw new Error(`Invalid HTTP response status ${response.status}`);
}