import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import toastr from 'toastr';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: []
        };

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        fetch('/movies')
            .then((response) => {
                if (!response.ok) throw new Error(`Invalid HTTP response status ${response.status}`);

                return response.json();
            })
            .then((data) => {
                this.setState({
                    movies: data
                })
            })
            .catch((err) => {
                toastr.error(err);
            });
    }

    render() {
        let moviesList = this.renderMoviesList(this.state.movies);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <br/>
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
        if (!movies.length) return (
            <div>No movies loaded.</div>
        );

        return (
            <div className="container">
                {
                    movies.map(movie => this.renderMovie(movie))
                }
            </div>
        );
    }

    renderMovie(movie) {
        return (
            <div className="row movie-row" key={movie.id}>
                <div className="col-sm-2">
                    <img width={96} height={142} src={movie.posterUrl} />
                </div>
                <div className="col-sm-10 text-left">
                    <a>{movie.title}</a>
                    <br/>
                    {movie.year} | {movie.runtime + ' min'} | {movie.genres.join(', ')}
                    <br/>
                    {movie.director} | {movie.actors}
                    <br/>
                    {movie.plot}
                </div>
            </div>
        );
    }


}

export default App;
