import React from 'react';

const TextInput = ({name, label, onChange, placeholder, value, error, rows}) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }

    if (!rows) rows = 3;

    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <textarea
                    type="text"
                    name={name}
                    className="form-control"
                    placeholder={placeholder}
                    value={value ? value : ''}
                    onChange={onChange}/>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        </div>
    );
};

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