import React from 'react';
import classnames from 'classnames';

class NumberInput extends React.Component {
    render() {
        let error = this.props.error;
        let value = this.props.value ? this.props.value : '0';
        let name = this.props.name;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputOnChange = (event) => {
            let value = parseInt(event.target.value, 10);
            this.props.onChange(event.target.name, value);
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{this.props.label}</label>
                <div className="field">
                    <input
                        type="number"
                        name={name}
                        className="form-control"
                        min="0"
                        value={value}
                        onChange={inputOnChange}/>
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

NumberInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired,
    error: React.PropTypes.string
};

export default NumberInput;