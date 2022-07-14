import React from "react";
import "../styles/Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <img
        height={50}
        width={50}
        src={props.repo.owner.avatar_url}
        alt="avatar"
      />
      <h4>{props.repo.name}</h4>
      <div className="mid-container">
        <div className="child-container">
          <p className="bold-text">{props.repo.language}</p>
          <p className="subtitle">language</p>
        </div>
        <div>
          <p className="heading">{props.repo.stargazers_count}</p>
          <p className="subtitle">star</p>
        </div>
      </div>
      <p className="description">{props.repo.description}</p>

      <a href={props.repo.html_url} className="card-button">
        Github
      </a>
    </div>
  );
};

export default Card;
