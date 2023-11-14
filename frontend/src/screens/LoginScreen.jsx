import { useState, useEffect } from "react"; //useEffect wil see for userInfo in the localstorage. if userinfo is present, it will redirect to the specific page.
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LinkButton from "../Utils/LinkButton";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Meta from "../components/Meta";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => {
    return state.auth;
  });

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo);
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // console.log(email, password);
      // const res = await login(email, password).unwrap();
      // dispatch(setCredentials(...res));

      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      // try {
      const response = await login({
        email: trimmedEmail,
        password: trimmedPassword,
      }).unwrap(); //if we use unwrap(), it will automatically extract data from the api request by unwrapping; we don't need to extract with "response.userInfo"
      dispatch(
        setCredentials({
          ...response,
        })
      );
      // for (let key in response) {
      //   console.log(response[key]);
      // }
      //   // console.log(`form loginScreen: ${response}`);

      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Meta title="login" />
      <FormContainer>
        <h1 className="text-3xl font-bold mb-8">Log In</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="flex flex-col w-full max-w-md">
            <label htmlFor="email">Email address:</label>

            <input
              type="email"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full max-w-md">
            <label htmlFor="password">Password:</label>

            <input
              type="password"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button>
            <Button type="submit" onClick={submitHandler}>
              Log In
            </Button>
          </button>
        </form>

        {isLoading && <Loader />}

        <div className="mt-8">
          <span className="mr-4">Don't have an account?</span>
          <LinkButton
            to={redirect ? `/register?redirect=${redirect}` : "/register"}
            button="Sign up!"
          ></LinkButton>
        </div>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
