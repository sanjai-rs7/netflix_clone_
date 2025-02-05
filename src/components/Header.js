import { useNavigate } from "react-router";
import { NETFLIX_LOGO, USER_ICON } from "../utils/constants";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { toggleShowGeminiSearch } from "../utils/geminiSlice.js";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const showGeminiSearch = useSelector(
    (store) => store?.gemini?.showGeminiSearch
  );

  useEffect(() => {
    const handleScroll = () => {
      const halfPageHeight = document.documentElement.scrollHeight / 2;
      if (window.scrollY >= halfPageHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // console.log("At Header component : ", user);
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user == null) {
    return (
      <div>
        <img
          src={NETFLIX_LOGO}
          alt="Netflix Logo"
          className="absolute my-8 mx-40 w-36 z-10"
        />
      </div>
    );
  }

  const handleGeminiSearchClick = () => {
    dispatch(toggleShowGeminiSearch());
  };

  return (
    <div
      className={`w-screen h-18 text-white fixed top-0 left-0 z-20 transition-all duration-300 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="px-14 py-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex space-x-8">
          <img
            src={NETFLIX_LOGO}
            alt="Netflix Logo"
            className="w-24 cursor-pointer"
          />
          <ul className="hidden md:flex space-x-6 text-sm">
            <li className="cursor-pointer hover:text-gray-400">Home</li>
            <li className="cursor-pointer hover:text-gray-400">TV Shows</li>
            <li className="cursor-pointer hover:text-gray-400">Movies</li>
            <li className="cursor-pointer hover:text-gray-400">
              New & Popular
            </li>
            <li className="cursor-pointer hover:text-gray-400">My List</li>
            <li className="cursor-pointer hover:text-gray-400">
              Browse by Languages
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-8">
          <FaSearch
            className="hidden sm:block cursor-pointer hover:text-gray-400"
            onClick={handleGeminiSearchClick}
          />
          <FaBell className="hover:text-gray-400" />
          {/* Profile Dropdown */}
          <div
            className="cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src={USER_ICON}
              alt="User Icon"
              className="hover:text-gray-400"
            />

            {showDropdown && (
              <div className="absolute right-2 mt-2 w-28 bg-black border border-gray-700 rounded-md shadow-lg">
                <ul>
                  <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                    Account
                  </li>
                  <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                    Help Center
                  </li>
                  <li
                    className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
