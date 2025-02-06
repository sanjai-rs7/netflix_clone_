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

  useEffect(() => {
    if (isHovered && movieId) {
      const fetchTrailer = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos`,
            TMBD_API_OPTIONS
          );
          const json = await response.json();
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
        } catch (error) {
          console.error("Failed to fetch trailer:", error);
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
      {/* <img
        src={poster_path ? IMG_CDN + poster_path : "/fallback-image.jpg"}
        alt={title}
        className="rounded-md transition-transform duration-300 hover:scale-110"
      /> */}
      {poster_path ? (
        <div>
          <img
            src={IMG_CDN + poster_path}
            className="rounded-md transition-transform duration-300 hover:scale-110 w-full h-full object-cover"
            alt="hello"
          />
          {isHovered && trailerKey && (
            <MovieHoverCard
              trailerKey={trailerKey}
              title={title}
              release_date={release_date}
              vote_average={vote_average}
              mousePosition={mousePosition}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovieCard;
