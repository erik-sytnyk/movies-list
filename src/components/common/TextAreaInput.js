import React from 'react';
import classnames from 'classnames';

class TextInput extends React.Component {
    render() {
        let {error, value, name, label, placeholder, rows} = this.props;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputOnChange = (event) => {
            this.props.onChange(event.target.name, event.target.value);
        };

        if (!rows) rows = 3;

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{label}</label>
                <div className="field">
                <textarea
                    type="text"
                    name={name}
                    rows={rows}
                    className="form-control"
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={inputOnChange}/>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

TextInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string,
    rows: React.PropTypes.number
};

export default TextInput;