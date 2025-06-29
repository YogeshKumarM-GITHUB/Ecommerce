import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser, RegisteUser } from "../features/User/UserSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userdata, setUserData] = useState({
    UserName: "",
    Password: "",
    Email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };

  const saveUserData = (e) => {
    e.preventDefault();
    dispatch(RegisteUser(userdata)).then((res) => {
      if (res.payload?.success) {
        toast.success("User registered successfully");
        setUserData({ UserName: "", Password: "", Email: "" });
        setShowLogin(false); // switch to login mode
      } else {
        toast.error(res.payload?.message || "User registration failed");
      }
    });
  };

  const handleLogin = () => {
    dispatch(LoginUser(userdata)).then((res) => {
        console.log(res);
      if (res?.payload) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(res.payload?.message || "Login failed");
      }
    });
  };

  return (
    <div className="flex items-center justify-center mt-[100px]">
      <div className="w-full max-w-md">
        {showLogin ? (
          <form onSubmit={saveUserData} className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
            <input
              type="text"
              name="UserName"
              value={userdata.UserName}
              onChange={handleUserData}
              placeholder="Name"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <input
              type="email"
              name="Email"
              value={userdata.Email}
              onChange={handleUserData}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <input
              type="password"
              name="Password"
              value={userdata.Password}
              onChange={handleUserData}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <div className="flex justify-between text-sm">
              <label className="cursor-pointer">Forgot password?</label>
              <label onClick={() => setShowLogin(false)} className="cursor-pointer text-blue-500">
                Already have an account? Login
              </label>
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2 cursor-pointer">
              Sign Up
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <input
              type="email"
              name="Email"
              value={userdata.Email}
              onChange={handleUserData}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <input
              type="password"
              name="Password"
              value={userdata.Password}
              onChange={handleUserData}
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-800"
            />
            <div className="flex justify-between text-sm">
              <label className="cursor-pointer">Forgot password?</label>
              <label onClick={() => setShowLogin(true)} className="cursor-pointer text-blue-500">
                Don't have an account? Sign up
              </label>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="bg-black text-white px-6 py-2 cursor-pointer"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
