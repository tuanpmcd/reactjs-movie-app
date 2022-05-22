import React, { useEffect, useState } from "react"
import axios from "axios";
import "./movieDetail.scss"
import { Link, useParams } from "react-router-dom"
import { img_500, unavailable } from '../../config/config'
import { API_KEY, API_URL_DETAIL } from "../../config/config";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MovieDetail = () => {
  const { id } = useParams()
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const { data } = await axios.get(
        `${API_URL_DETAIL}/${id}?api_key=${API_KEY}`
      );
      setMovieDetail(data);
      window.scrollTo(0, 0);
    }
    fetchMovieDetail()
  }, [id])
  console.log(movieDetail);

  const handlRedirect = () => {
    window.open("https://www.cathaycineplexes.com.sg/", "_blank")
  }

  return (
    <>
      {
        movieDetail && (
          <>
            <div
              className="banner"
              style={{
                backgroundImage: `url('${img_500}${movieDetail.backdrop_path || movieDetail.poster_path}')` || `url('${unavailable}')`
              }}>
            </div>
            <div className="mb-3 movie-content container">
              <div className="movie-content_poster">
                <div className="movie-content_poster_img" style={{ backgroundImage: `url('${img_500}${movieDetail.poster_path || movieDetail.backdrop_path}')` }}></div>
              </div>
              <div className="movie-content_info">
                <h2 className="title">
                  {movieDetail.title || movieDetail.name}
                </h2>
                <div className="genres">
                  {
                    movieDetail.genres && movieDetail.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="genres_item">{genre.name}</span>
                    ))
                  }
                </div>
                <p className="overview">{movieDetail.overview}</p>
                <div className="lang_duration">
                  <h3> Languages: </h3>
                  {
                    movieDetail.spoken_languages && movieDetail.spoken_languages.slice(0, 5).map((spoken_language, i) => (
                      <span key={i} className="genres_item">{spoken_language.english_name}</span>
                    ))
                  }
                  <h3>
                    Duration:
                  </h3>
                  {
                    <span className="genres_item">
                      {movieDetail.runtime === 0 ? "" : movieDetail.runtime}
                      {movieDetail.runtime === 0 ? "Coming soon" : " mins"}
                    </span>
                  }
                </div>

                <Link onClick={handlRedirect} className="watch_now" to="/">
                  <span>{movieDetail.runtime === 0 ? "Watch Trailer" : "Watch Now"}</span>
                  <PlayArrowIcon color="primary" />
                </Link>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default MovieDetail