import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const ShowGeminiResults = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gemini);
  if (!movieNames) return null;
  console.log(movieResults);
  console.log(movieNames);

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          // console.log(movieName)
          // console.log(movieResults[index])
          <MovieList
            key={movieName}
            title={movieName}
            movieList={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowGeminiResults;
