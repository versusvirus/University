import React from 'react'
import './Popup.css'

class Popup extends React.Component {
    render() {
        var content = this.props.openend && <div className="controls-Popup">
            <div className="controls-Popup__window">
                {this.props.content}
            </div>
        </div>
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default Popup