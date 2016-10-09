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
        this.renderMoviesList = this.renderMoviesList.bind(this);
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
            <table className="table">
                <thead>
                <tr>
                    <th className="text-center">Title</th>
                    <th className="text-center">Year</th>
                    <th className="text-center">Runtime</th>
                    <th className="text-center">Genres</th>
                    <th className="text-center">Director</th>
                    <th className="text-center">Actors</th>
                    <th className="text-center">Plot</th>
                </tr>
                </thead>
                <tbody>
                {movies.map(movie =>
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.year}</td>
                        <td>{movie.runtime + ' min'}</td>
                        <td>{movie.genres.join(', ')}</td>
                        <td>{movie.director}</td>
                        <th>{movie.actors}</th>
                        <th>{movie.plot}</th>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }


}

export default App;
