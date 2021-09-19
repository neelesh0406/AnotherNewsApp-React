import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="card" style={{ maxWidth: "24rem", fontSize: ".8rem", transform: "scale(1)" }}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "91%"}}>{source}</span>
                <img className="card-img-top" src={imageUrl ? imageUrl : "http://www.cricbuzz.com/a/img/v1/600x400/i1/c213153/in-15-years-sharath-was-the-f.jpg"} alt="news here" />
                <div className="card-body">
                    <h6 className="card-title">{title ? title : ""}</h6>
                    <p className="card-text">{description ? description : ""}</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read more</a>
                </div>
            </div>
        )
    }
}