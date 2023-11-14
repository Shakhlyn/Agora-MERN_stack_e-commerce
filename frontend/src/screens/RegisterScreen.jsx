import { useState, useEffect } from "react"; //useEffect wil see for userInfo in the localstorage. if userinfo is present, it will redirect to the specific page.
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LinkButton from "../Utils/LinkButton";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";

import { useRegisterMutation } from "../slices/usersApiSlice"; //for api request
import { setCredentials } from "../slices/authSlice"; //to set localStorage
import Meta from "../components/Meta";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedPasswordConfirm = passwordConfirm.trim();

    if (trimmedPassword !== trimmedPasswordConfirm) {
      toast.error("Passwords are different!");
    } else {
      try {
        const response = await register({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
        }).unwrap(); //if we use unwrap(), it will automatically extract data from the api request by unwrapping; we don't need to extract with "response.userInfo"
        dispatch(
          setCredentials({
            ...response,
          })
        );
        navigate(redirect);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Meta title="signup" />

      <FormContainer>
        <h1 className="text-3xl font-bold mb-8">Sign Up</h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div className="flex flex-col w-full max-w-md">
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Enter Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <div className="flex flex-col w-full max-w-md">
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              type="password"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Confirm your Password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button>
            <Button type="submit" onClick={submitHandler}>
              Sign up
            </Button>
          </button>
        </form>

        {isLoading && <Loader />}

        <div className="mt-8">
          <span className="mr-4">Already have an account?</span>
          <LinkButton
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            button="Log in!"
          ></LinkButton>
        </div>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
