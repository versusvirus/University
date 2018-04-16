import React from 'react'
import './Button.css'

class Button extends React.Component {

    render() {
        var options = this.props,
            disabled = options.enabled === undefined ? '' : options.enabled ? '' : 'disabled';
        return (
            <button className={'controls-button '.concat(options.class ? options.class : '')} disabled={disabled} onClick={this.toggleDisabled}>
                {options.caption}
            </button>
        )
    }
}


export default Button