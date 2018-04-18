import React from 'react'
import './Button.css'

class Button extends React.Component {

    render() {
        let options = this.props,
            disabled = options.enabled === undefined ? '' : options.enabled ? '' : 'disabled';
        return (
            <button className={'controls-button '.concat(options.class ? options.class : '')} disabled={disabled} onClick={options.handler}>
                {options.caption}
            </button>
        )
    }
}


export default Button