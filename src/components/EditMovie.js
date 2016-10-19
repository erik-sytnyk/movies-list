import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from './common/TextInput';
import TextAreaInput from './common/TextAreaInput';
import NumberInput from './common/NumberInput';
import SelectInput from './common/SelectInput';

import autoBind from 'react-autobind';

class EditMovie extends React.Component {
    constructor(props) {
        super(props);

        let genresOptions = this.props.genres.map(g => ({
            value: g,
            label: g
        }));

        this.state = {
            genresOptions,
            errors: {}
        };

        autoBind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            errors: {}
        });
    }

    formIsValid() {
        let errors = {};
        let fieldIsRequired = 'Field is required.';
        let movie = this.props.movie;

        if (!movie.title) {
            errors.title = fieldIsRequired;
        }

        if (!movie.year) {
            errors.year = fieldIsRequired;
        } else if (movie.year < 1900 || movie.year > 2050) {
            errors.year = 'Invalid year value (should be between 1900 and 2050).'
        }

        if (!movie.runtime) {
            errors.runtime = fieldIsRequired;
        }

        if (!movie.director) {
            errors.director = fieldIsRequired;
        }

        if (!movie.actors) {
            errors.actors = fieldIsRequired;
        }

        this.setState({errors: errors});

        return Object.keys(errors).length === 0;
    }

    save() {
        if (!this.formIsValid()) return;

        this.props.save();
    }

    render() {
        if (!this.props.movie) return null;

        let selectedGenres = this.state.genresOptions.filter(go => {
            if (!this.props.movie) return false;

            return this.props.movie.genres.indexOf(go.value) !== -1;
        });

        return (
            <div>
                <Modal show={this.props.visible} onHide={this.props.close}>
                    <Modal.Header closeButton onClick={this.props.close}>
                        <Modal.Title>Edit movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TextInput
                            name="title"
                            label="Title"
                            value={this.props.movie.title}
                            onChange={this.props.onChange}
                            placeholder="Title"
                            error={this.state.errors.title}
                        />
                        <NumberInput
                            name="year"
                            label="Year"
                            value={this.props.movie.year}
                            onChange={this.props.onChange}
                            error={this.state.errors.year}
                        />
                        <NumberInput
                            name="runtime"
                            label="Runtime"
                            value={this.props.movie.runtime}
                            onChange={this.props.onChange}
                            error={this.state.errors.runtime}
                        />
                        <SelectInput
                            name="genres"
                            label="Genres"
                            multi={true}
                            options={this.state.genresOptions}
                            value={selectedGenres}
                            onChange={this.props.onChange}
                            error={this.state.errors.genres}
                        />
                        <TextInput
                            name="director"
                            label="Director"
                            value={this.props.movie.director}
                            onChange={this.props.onChange}
                            placeholder="Director"
                            error={this.state.errors.director}
                        />
                        <TextAreaInput
                            name="actors"
                            rows={2}
                            isLargeText={true}
                            label="Actors (comma separated)"
                            value={this.props.movie.actors}
                            onChange={this.props.onChange}
                            placeholder="Actors"
                            error={this.state.errors.actors}
                        />
                        <TextAreaInput
                            name="plot"
                            rows={4}
                            isLargeText={true}
                            label="Plot"
                            value={this.props.movie.plot}
                            onChange={this.props.onChange}
                            placeholder="Plot"
                            error={this.state.errors.plot}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.save}>Save</Button>
                        <Button onClick={this.props.close}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

EditMovie.propTypes = {
    save: React.PropTypes.func.isRequired,
    close: React.PropTypes.func.isRequired,
    movie: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    visible: React.PropTypes.bool
};

export default EditMovie;