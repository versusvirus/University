import React from 'react'
import './Input.css'

class Input extends React.Component {
    state = {
        text: 'asd'
    };

    render() {
        let options = this.props,
            input = options.enabled && <input type={options.type} value={this.state.text}/>,
            disabledText = !options.enabled && <div>{this.state.text}</div>;
        return (
            <span className={"controls-".concat(this.constructor.name + '__').concat(options.type)}>
                {input}
                {disabledText}
            </span>
        )
    }
}

export default Input