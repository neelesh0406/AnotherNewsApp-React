import React, { Component } from 'react'
import loader from './loading.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div className="container text-center" style={{marginTop: "30vh"}}>
                <img src={loader} alt="loading" />
            </div>
        )
    }
}
