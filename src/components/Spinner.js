import React, { Component } from 'react'
import loader from './loading.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className="text-center" style={{transform: "scale(.5)", margin: "-10px 0"}}>
                <img src={loader} alt="loading" />
            </div>
        )
    }
}
