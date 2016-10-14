import React, {Component} from 'react';
import noMovie from '../media/no-movie.png';
import '../styles/App.css';
import moviesService from '../movieService';
import {Button, Glyphicon} from 'react-bootstrap';
import toastr from 'toastr';
import Confirm from './Confirm';
import autoBind from 'react-autobind';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            movieToDeleteId: null
        };

        autoBind(this);
    }

    loadData() {
        moviesService.getMovies()
            .then((data) => {
                this.setState({
                    movies: data
                })
            });
    }

    deleteMovie() {
        moviesService.deleteMovie(this.state.movieToDeleteId)
            .then(() => {
                toastr.success('Movie was deleted');

                this.loadData();

                this.setState({
                    movieToDeleteId: null
                });
            });
    }

    render() {
        let moviesList = this.renderMoviesList(this.state.movies);
        return (
            <div className="App">
                <div className="container">
                    <div className="row">
                        <button className="btn btn-primary" onClick={this.loadData}>Load data</button>
                        <br/>
                        <br/>
                        {moviesList}
                    </div>
                </div>
            </div>
        );
    }

    renderMoviesList(movies) {
        if (!movies || !movies.length) return (
            <div>No movies loaded.</div>
        );

        let deleteConfirmVisible = this.state.movieToDeleteId ? true: false;

        return (
            <div className="container">
                <div id="movie-list">
                    {
                        movies.map(movie => this.renderMovie(movie))
                    }
                </div>
                <Confirm visible={deleteConfirmVisible} action={this.deleteMovie} close={this.cancelDeleteMovie}/>
            </div>
        );
    }

    confirmDeleteMovie(id) {
        this.setState({
            movieToDeleteId: id
        });
    }

    cancelDeleteMovie() {
        this.setState({
            movieToDeleteId: null
        });
    }

    renderMovie(movie) {
        let posterUrl = movie.posterUrl ? movie.posterUrl : noMovie;

        return (
            <div className="movie-row" key={movie.id}>
                <div className="image">
                    <img width={96} height={142} src={posterUrl} title={movie.title} alt={movie.title}/>
                </div>

                <div className="title">
                    <h3>
                        <a href="#">{movie.title}</a>
                        <Button onClick={() => this.confirmDeleteMovie(movie.id)}><Glyphicon glyph="remove"/></Button>
                        <Button><Glyphicon glyph="edit"/></Button>
                    </h3>

                    <p className="movie-info">
                        {movie.year}
                        <span>{movie.runtime + ' min.'}</span>
                        <span>{movie.genres.join(', ')}</span>
                    </p>

                    <p className="actors">
                        {movie.director}
                        <span>{movie.actors}</span>
                    </p>

                    <p className="plot">{movie.plot}</p>
                </div>
            </div>
        );
    }
}

export default App;
