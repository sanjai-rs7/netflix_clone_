import { useSelector } from "react-redux";
import useMoviePromo from "../hooks/useMoviePromo";
import PromoText from "./PromoText";

const PromoBackground = ({ movieId, original_title, overview }) => {
  // console.log("Movie ID at PromoBackground", movieId);
  useMoviePromo(movieId); // Fetch promoVideo info in Redux store
  const promoVideo = useSelector((store) => store?.movie?.promoVideo);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover scale-150"
        src={`https://www.youtube.com/embed/${promoVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${promoVideo?.key}`}
        title="Promo Video"
        allow="autoplay; encrypted-media; loop; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <PromoText original_title={original_title} overview={overview} />
    </div>
  );
};

export default PromoBackground;
