import React, { Component } from 'react'

import './styles/Button.css'

const block = {
    display: 'block'
}

export default class NavButton extends Component {
    render() {
        const faClasses = `fa ${this.props.font}`
        const name = this.props.name
        return (
            <div>
                <button className="btn" onClick={this.props.switch}>   
                    <i className={faClasses} style={block}></i>{name}
                </button>
            </div>
        );
    }
}