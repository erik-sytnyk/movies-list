import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';

class SelectInput extends React.Component {
    render() {
        let error = this.props.error;

        let wrapperClass = classnames({
            'form-group': true,
            'has-error': error && error.length > 0
        });

        let inputOnChange = (val) => {
            let value = val.map(x => x.value);

            this.props.onChange(this.props.name, value);
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={name}>{this.props.label}</label>
                <div className="field">
                    <Select
                        name={this.props.name}
                        multi={this.props.multi}
                        options={this.props.options}
                        value={this.props.value}
                        onChange={inputOnChange}
                    />
                    {error && <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        );
    }
}

SelectInput.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    options: React.PropTypes.array,
    value: React.PropTypes.array,
    error: React.PropTypes.string
};

export default SelectInput;