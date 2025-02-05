import { useRef } from "react";
import { BG_IMG, TMBD_API_OPTIONS } from "../utils/constants";
import { addGeminiMovie } from "../utils/geminiSlice";
import { useDispatch } from "react-redux";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import ShowGeminiResults from "./ShowGeminiResults";

const GeminiSearch = () => {
  const searchText = useRef();
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      TMBD_API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleClick = async () => {
    console.log(searchText.current.value);

    const { GoogleGenerativeAI } = require("@google/generative-ai");

    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, ....";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    // console.log(result);
    // console.log(result.response);

    const geminiMovies = result.response.text().split(", ");
    console.log(geminiMovies);

    const promiseArray = geminiMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGeminiMovie({ movieNames: geminiMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="flex">
      <img src={BG_IMG} alt="BG_IMG" className="brightness-50" />
      <form
        className="absolute w-1/2 top-20 left-[50%] transform -translate-x-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder="Seacrh for movies..."
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleClick}
        >
          Search
        </button>
      </form>

      <ShowGeminiResults />
    </div>
  );
};

export default GeminiSearch;
