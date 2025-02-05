import { useDispatch } from "react-redux";
import { TMBD_API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { addPromoVideo } from "../utils/moveiSlice";

const useMoviePromo = (movieId) => {
  const dispatch = useDispatch();
  const getMoviePromo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      TMBD_API_OPTIONS
    );
    const json = await data.json();
    // console.log("At useMoviePromo");
    // console.log(json.results);
    const trailerList = json.results.filter(
      (video) => video.type === "Trailer"
    );
    // console.log(trailerList);
    const promoVideo = trailerList ? trailerList[0] : json.results[0];
    dispatch(addPromoVideo(promoVideo));
  };

  useEffect(() => {
    getMoviePromo();
  }, []);
};

export default useMoviePromo;
