import toastr from 'toastr';

export default {
    getMovies,
    deleteMovie
};

function getMovies(page) {
    return fetch(`/movies?_page=${page}&_sort=title`)
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
    return fetch(`/movies/${id}`, {
            method: 'DELETE'
        })
        .then((response) => {
            checkStatus(response);
        })
        .catch((err) => {
            toastr.error(err);
        });
}

function checkStatus(response) {
    if (!response.ok) throw new Error(`Invalid HTTP response status ${response.status}`);
}