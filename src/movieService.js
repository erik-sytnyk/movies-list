import toastr from 'toastr';

export default {
    getMovies
};

function getMovies() {
    return fetch('/movies')
        .then((response) => {
            if (!response.ok) throw new Error(`Invalid HTTP response status ${response.status}`);

            return response.json();
        })
        .catch((err) => {
            toastr.error(err);
        });
}