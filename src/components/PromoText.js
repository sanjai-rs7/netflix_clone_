// import { GrPlayFill } from "react-icons/gr";

const PromoText = ({ original_title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/40 to-transparent">
      <div className="absolute top-[30%] left-[46px] w-[30%] text-white">
        <h1 className="text-5xl py-4 font-bold">{original_title}</h1>
        <p className="font-semibold py-4">{overview}</p>

        <div className="space-x-4">
          <button className="bg-white text-black text-xl w-36 px-3 py-4 rounded-md font-bold hover:bg-gray-300">
            Play
          </button>
          <button className="bg-gray-500 bg-opacity-80 text-white text-xl w-36 px-6 py-4 rounded-md font-bold hover:bg-opacity-50">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoText;
