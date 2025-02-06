// import MovieCard from "./MovieCard";

// const MovieList = ({ title, movieList }) => {
//   if (movieList === null || movieList === undefined) return;
//   return (
//     <div className="ml-12 pb-20">
//       <h1 className="text-white text-2xl py-2 font-bold">{title}</h1>
//       <div className="flex overflow-x-scroll scrollbar-hide">
//         <div className="flex space-x-2">
//           {movieList.map((movie) => {
//             return (
//               <MovieCard
//                 key={movie.id}
//                 movieId={movie.id}
//                 poster_path={movie.poster_path}
//                 title={movie.original_title}
//                 release_date={movie.release_date}
//                 vote_average={movie.vote_average}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieList;

import MovieCard from "./MovieCard";

const MovieList = ({ title, movieList }) => {
  if (!Array.isArray(movieList) || movieList.length === 0) return null;

  return (
    <div className="pb-20 w-full">
      <h1 className="text-white text-2xl py-2 font-bold pl-12">{title}</h1>
      <div className="overflow-x-scroll scrollbar-hide w-full">
        <div className="flex space-x-4 px-12 w-max">
          {movieList.flat().map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              poster_path={movie.poster_path}
              title={movie.original_title}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
