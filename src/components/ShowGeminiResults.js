import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const ShowGeminiResults = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gemini);
  console.log(movieResults);

  if (!movieNames || !movieResults) return null;

  return (
    <div className="relative p-4 text-white w-full ">
      <div className="relative z-10 flex flex-col items-center w-full">
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movieList={movieResults[index] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowGeminiResults;
