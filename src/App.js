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
            <table className="container">
                <tbody>
                    {
                        movies.map(movie => this.renderMovie(movie))
                    }
                </tbody>
            </table>
        );
    }

    renderMovie(movie) {
        return (
            <tr className="movie-row" key={movie.id}>
                <td className="number">{movie.id}.</td>

                <td className="image">
                    <img width={70} height={96} src={movie.posterUrl} title={movie.title} alt={movie.title} />
                </td>

                <td className="title">
                    <a>{movie.title}</a>
                    <span> ({movie.year})</span>
                    <br/>
                    <span className="plot">{movie.plot}</span>
                    <br/>
                    <span>Dir: {movie.director} With: {movie.actors}</span>
                    <br/>
                    <span className="genre">{movie.genres.join(' | ')}</span>
                    <span className="runtime">{movie.runtime + ' mins.'}</span>
                </td>
            </tr>
        );
    }


}

export default App;
