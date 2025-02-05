import { useSelector } from "react-redux";
import PromoBackground from "./PromoBackgroundVideo";
const MainContainer = () => {
  const moviesList = useSelector((store) => store.movie?.nowPlayingMovies);
  if (moviesList === null) return;
  const firstMovie = moviesList[0];
  const { id, original_title, overview } = firstMovie;

  return (
    <div>
      <PromoBackground
        movieId={id}
        original_title={original_title}
        overview={overview}
      />
      {/* <PromoText original_title={original_title} overview={overview} /> */}
    </div>
  );
};

export default MainContainer;
