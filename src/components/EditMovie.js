import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import TextInput from './common/TextInput';

class EditMovie extends React.Component {
    render() {
        if (!this.props.movie) return null;

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