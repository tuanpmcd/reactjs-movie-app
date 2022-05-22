import { Link } from "react-router-dom";
import { img_300, unavailable } from "../../config/config";
import "./singleMovie.scss"

const SingleContent = ({ movie }) => {
  const { id, poster_path, title, popularity } = movie

  return (
    <div className="singleMovie">
      <Link to={`movie/${id}`}>
        <img
          className="poster"
          src={poster_path ? `${img_300}${poster_path}` : unavailable}
          alt={title}
        />
        <h2 className="title">{title}</h2>
        <span className="subTitle">
          <span className="subTitle">Popularity: {popularity}</span>
        </span>
      </Link>
    </div>
  );
};

export default SingleContent;
