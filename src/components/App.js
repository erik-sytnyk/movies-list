import React, {Component} from 'react';
import noMovie from '../media/no-movie.png';
import '../styles/App.css';
import moviesService from '../movieService';
import {Button, Glyphicon, Pagination} from 'react-bootstrap';
import toastr from 'toastr';
import Confirm from './Confirm';
import autoBind from 'react-autobind';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            total: 0,
            movieToDeleteId: null,
            activePage: 1
        };

        autoBind(this);
    }

    loadData() {
        moviesService.getMovies(this.state.activePage)
            .then((data) => {
                this.setState({
                    movies: data.dataItems,
                    total: data.total
                })
            });
    }

    confirmDeleteMovie(id) {
        this.setState({
            movieToDeleteId: id
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

    cancelDeleteMovie() {
        this.setState({
            movieToDeleteId: null
        });
    }

    pageSelection(eventKey) {
        this.setState({
            activePage: eventKey
        }, () => {
            //after setSate is completed
            this.loadData();
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
        let pageNumber = Math.ceil(this.state.total / 10);

        return (
            <div className="container">
                <Pagination
                    bsSize="medium"
                    first
                    last
                    ellipsis
                    maxButtons={5}
                    items={pageNumber}
                    activePage={this.state.activePage}
                    onSelect={this.pageSelection}
                />
                <div id="movie-list">
                    {
                        movies.map(movie => this.renderMovie(movie))
                    }
                </div>
                <Confirm visible={deleteConfirmVisible} action={this.deleteMovie} close={this.cancelDeleteMovie}/>
            </div>
        );
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
