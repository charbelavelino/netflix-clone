import { Link } from "react-router-dom";
import "./TitleCards.css";


import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const TitleCards = ({ title , category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmVhZjYyOGU0YjAxNmI2Zjc4OTg0NzczMmE1OTE0YiIsIm5iZiI6MTcyNTg5NzYwMy4zNTUyNjgsInN1YiI6IjY2ZGYxOWRiZGVhMzFmMjcwNzZkNTI2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n0weqteg7F0coPMbruevPkFfGODA-v2CMPgWAOj3huk"
    }
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
              alt=""
            />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
