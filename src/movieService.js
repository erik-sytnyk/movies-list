import toastr from 'toastr';

export default {
    getMovies,
    deleteMovie
};

function getMovies() {
    return fetch('/movies')
        .then((response) => {
            checkStatus(response);

            return response.json();
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