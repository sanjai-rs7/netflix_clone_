import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movie = useSelector((store) => store?.movie);
  if (movie === null) return;
  return (
    <div className="bg-[#141414]">
      <div className="-mt-32 relative">
        <MovieList
          title={"Now Playing in Theatres"}
          movieList={movie.nowPlayingMovies}
        />
        <MovieList
          title={"Top Rated Movies"}
          movieList={movie.topRatedMovies}
        />
        ;
        <MovieList title={"Popular Movies"} movieList={movie.popularMovies} />;
        <MovieList title={"Upcoming Movies"} movieList={movie.upcomingMovies} />
        ;
      </div>
    </div>
  );
};

export default SecondaryContainer;
