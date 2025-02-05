import { BG_IMG } from "../utils/constants";
import Header from "./Header";
import { useState, useRef } from "react";
import checkValidData from "../utils/validateForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignup, setIsSignUp] = useState(false);
  // console.log(isSignup);

  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const err = checkValidData(email.current.value, password.current.value);
    setErrorMessage(err);
    if (err) {
      return;
    }

    if (isSignup) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("At createUserWithEmailAndPassword");
          // console.log(user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://example.com/jahttps://media.licdn.com/dms/image/v2/D5603AQF4CDteOI5TkA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1687534471570?e=1743638400&v=beta&t=TKxmskxuaAMQh1udBB5M1cvEhhvgtfoMzgh6Xc0SFfYne-q-user/profile.jpg",
          })
            .then(() => {
              // console.log("At updateProfile");
              // console.log(auth.currentUser);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // console.log(uid, email, displayName, photoURL);
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      // Sign Up Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div className="relative h-screen w-screen bg-black">
      <Header />
      <div className="w-full shadow-white">
        <img
          src={BG_IMG}
          alt="Background"
          className="w-full h-full top-0 left-0 absolute brightness-50 object-cover"
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 p-12 w-[424px] bg-black bg-opacity-70 
        transform -translate-x-1/2 -translate-y-1/2 rounded-sm shadow-lg"
      >
        <form className="m-2" onSubmit={(e) => e.preventDefault()}>
          <h1 className="font-bold text-3xl mb-2 text-white">
            {isSignup ? "Sign Up" : "Sign In"}
          </h1>
          {isSignup && (
            <input
              className="w-full bg-gray-950 bg-opacity-80 text-white p-4 my-3 border-[0.5px] border-gray-400 rounded-md"
              placeholder="Name"
              ref={name}
            ></input>
          )}

          <input
            className="w-full bg-gray-950 bg-opacity-80 text-white p-4 my-3 border-[0.5px] border-gray-400 rounded-md"
            placeholder="Email or mobile number"
            ref={email}
          ></input>
          <input
            type="password"
            className="w-full bg-gray-950 bg-opacity-80 text-white p-4 my-3 border-[0.5px] border-gray-400 rounded-md"
            placeholder="Password"
            ref={password}
          ></input>

          {/* Red color sign in or sign up button */}
          <button
            className="w-full mt-2 bg-red-600 text-white font-bold rounded-sm h-12 hover:bg-red-700 transition delay-100 ease-in-out"
            onClick={handleButtonClick}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-red-600 mt-4 text-center">{errorMessage}</p>

          {!isSignup && (
            <div>
              <div className="text-gray-400 my-4 text-center">OR</div>
              <button className="w-full bg-gray-400 bg-opacity-30 text-white font-bold rounded-sm h-12 hover:bg-opacity-20 transition delay-100 ease-in-out">
                Use a sign-in code
              </button>
            </div>
          )}

          {!isSignup && (
            <div className="text-white text-center my-4 cursor-pointer">
              Forgot Password?
            </div>
          )}

          <div className="">
            <input type="checkbox" className="w-4 h-4 mt-2" />
            <label className="text-white ml-2 text-base">Remember me</label>
          </div>

          {/* I should in sign in page to sign up */}
          {!isSignup && (
            <div className="text-white my-2">
              New to Netflix?{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  setIsSignUp(true);
                  if (email.current) email.current.value = "";
                  if (password.current) password.current.value = "";
                  if (name.current) name.current.value = "";
                }}
              >
                Sign up now.
              </span>
              <p className="text-xs mt-2">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                <span className="text-blue-500 cursor-pointer hover:underline">
                  Learn more.
                </span>
              </p>
            </div>
          )}

          {/* I should in sign up page to sign in */}
          {isSignup && (
            <div className="text-white my-2">
              Already have an account?{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => {
                  setIsSignUp(false);
                  if (email.current) email.current.value = "";
                  if (password.current) password.current.value = "";
                  if (name.current) name.current.value = "";
                }}
              >
                Sign In now.
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
