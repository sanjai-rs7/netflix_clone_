import { IMG_CDN, TMBD_API_OPTIONS } from "../utils/constants";
import { useState, useEffect } from "react";
import MovieHoverCard from "./MovieHoverCard";

const MovieCard = ({
  movieId,
  poster_path,
  title,
  release_date,
  vote_average,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event) => {
    const { clientX, clientY } = event; // Get mouse position
    setMousePosition({ x: clientX, y: clientY });

    const timeout = setTimeout(() => {
      setIsHovered(true);
    }, 300); // Slight delay to mimic Netflix's hover effect
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout); // Clear timeout if user stops hovering
    setIsHovered(false);
  };

  // Hide hover card on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsHovered(false); // Hide the hover card when scrolling
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      const fetchTrailer = async () => {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
          TMBD_API_OPTIONS
        );
        const json = await data.json();
        if (!json.results) return;

        const trailerList = json.results.filter(
          (video) => video.type === "Trailer"
        );

        const trailerVideo = trailerList.length
          ? trailerList[0]
          : json.results[0];
        if (trailerVideo) {
          setTrailerKey(trailerVideo.key);
        }
      };
      fetchTrailer();
    }
  }, [isHovered, movieId]);

  return (
    <div
      className="w-48 cursor-pointer relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={IMG_CDN + poster_path}
        alt={poster_path}
        className="rounded-md transition-transform duration-300 hover:scale-110"
      />

      {isHovered && trailerKey && (
        <MovieHoverCard
          trailerKey={trailerKey}
          title={title}
          release_date={release_date}
          vote_average={vote_average}
          mousePosition={mousePosition} // Pass mouse position to hover card
        />
      )}
    </div>
  );
};

export default MovieCard;
