import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from './common/TextInput';
import TextAreaInput from './common/TextAreaInput';
import NumberInput from './common/NumbertInput';
import Select from 'react-select';
import autoBind from 'react-autobind';

class EditMovie extends React.Component {
    constructor(props) {
        super(props);

        let genresOptions = this.props.genres.map(g => ({
            value: g,
            label: g
        }));

        this.state = {
            genresOptions
        };

        autoBind(this);
    }

    selectOnChange(val) {
        let genres = val.map(x => x.value);

        this.props.onChange({
           target: {
               name: 'genres',
               value: genres
           }
        });
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
                        />
                        <NumberInput
                            name="year"
                            label="Year"
                            value={this.props.movie.year}
                            onChange={this.props.onChange}
                        />
                        <NumberInput
                            name="runtime"
                            label="runtime"
                            value={this.props.movie.runtime}
                            onChange={this.props.onChange}
                        />
                        <Select
                            name="genres"
                            multi={true}
                            options={this.state.genresOptions}
                            value={selectedGenres}
                            onChange={this.selectOnChange}
                        />
                        <TextInput
                            name="director"
                            label="Director"
                            value={this.props.movie.director}
                            onChange={this.props.onChange}
                            placeholder="Director"
                        />
                        <TextAreaInput
                            name="actors"
                            rows={2}
                            isLargeText={true}
                            label="Actors (comma separated)"
                            value={this.props.movie.actors}
                            onChange={this.props.onChange}
                            placeholder="Actors"
                        />
                        <TextAreaInput
                            name="plot"
                            rows={4}
                            isLargeText={true}
                            label="Plot"
                            value={this.props.movie.plot}
                            onChange={this.props.onChange}
                            placeholder="Plot"
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.save}>Save</Button>
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