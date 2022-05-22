import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Filters from '../../components/filters/Filters';
import SingleMovie from '../../components/singleMovie/SingleMovie';
import "./movies.scss"
import Loading from "../../assets/loader-loading.gif"
import { API_URL } from '../../config/config';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1)
  const [sortOrder, setSortOrder] = useState("release_date.desc");
  const [loading, setLoading] = useState(false)

  const fetchMovies = async (pageNumber) => {
    const { data } = await axios.get(
      `${API_URL}?api_key=${process.env.REACT_APP_API_KEY}&primary_release_date.lte=2020-12-31&sort_by=${sortOrder}&page=${pageNumber}`
    );

    if (pageNumber === 1) {
      setMovies(data.results);
    } else {
      setMovies(m => [...m, ...data.results])
    }
    setLoading(true)
  };

  useEffect(() => {
    fetchMovies(pageNumber);
    // eslint-disable-next-line
  }, [sortOrder, pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }

  const pageEnd = useRef();
  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          num++;
          loadMore();
          if (num >= 10) {
            observer.unobserve(pageEnd.current)
          }
        }
      }, { threshold: 1 });

      observer.observe(pageEnd.current)
    }
  }, [loading, num])

  useEffect(() => {
    setPageNumber(1);
  }, [sortOrder])

  return (
    <>
      <Filters setSortOrder={setSortOrder} />

      <div className="movies" >
        {
          movies && movies.map((movie, i) => (
            <SingleMovie key={i} movie={movie} />
          ))
        }
      </div>

      <div className="loading">
        <img width={30} height={30} src={Loading} alt="" />
        <button onClick={loadMore} ref={pageEnd}>
          Load More
        </button>
      </div>

    </>
  )
}

export default Movies