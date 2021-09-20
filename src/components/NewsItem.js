import React from 'react'

export default function NewsItem (props){
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        return (
            <div className="card" style={{ maxWidth: "20rem", fontSize: ".8rem", transform: "scale(1)" }}>
                <div className="position-absolute d-flex end-0">
                    <span className="badge rounded bg-danger" style={{fontSize: ".7rem"}}>{source}</span>
                </div>
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