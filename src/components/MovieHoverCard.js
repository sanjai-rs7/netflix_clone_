import { motion } from "framer-motion";

const MovieHoverCard = ({
  trailerKey,
  title,
  release_date,
  vote_average,
  mousePosition,
}) => {
  return (
    <motion.div
      className="fixed bg-gray-600 rounded-lg shadow-2xl shadow-black overflow-hidden z-50"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: "translate(-200%, -200%)", // Center the card above the mouse
      }}
      initial={{ opacity: 0, scale: 0.8 }} // Start with 0 opacity and small size
      animate={{ opacity: 1, scale: 1 }} // Animate to full size and visible
      exit={{ opacity: 0, scale: 0.8 }} // Shrinks down when removed
      transition={{ duration: 0.2, ease: "easeOut" }} // Smooth transition
    >
      {/* Trailer Video */}
      <div className="relative aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailerKey}`}
          title="Trailer"
          allow="autoplay; encrypted-media; loop; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="text-white text-lg font-bold">{title}</h3>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-green-500 font-semibold">
            {Math.round(vote_average * 10)}% Match
          </span>
          <span className="text-gray-400">{release_date?.split("-")[0]}</span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 mt-4">
          <button className="bg-white text-black px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors">
            Play
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition-colors">
            More Info
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieHoverCard;
