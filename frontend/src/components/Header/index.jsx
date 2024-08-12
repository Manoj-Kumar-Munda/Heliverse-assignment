import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import axios from "axios";

const Header = () => {
  const { user, status } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logoutUser = async () => {
    try {
      const res = await axios.post("/api/v1/user/logout");
      console.log(res);

      if (!res?.data?.success) {
        throw new Error("Failed to logout");
      }
      toast.success("logeed out successfully");
      dispatch(logout());
    } catch (error) {
      toast.error(error?.message || "Failed");
    }
  };

  return (
    <>
      <Toaster />
      <header className="bg-blue-500 py-4 px-2 md:px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">School</h1>
        </div>

        <nav>
          <ul className="flex items-center gap-2">
            {!user ? (
              <>
                <li>
                  <Link
                    to={"/auth/login"}
                    className="bg-white text-blue-500 font-bold px-4 py-2 rounded-lg  "
                  >
                    <span>Sign in</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/auth/signup"}
                    className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg  "
                  >
                    <span>Register</span>
                  </Link>
                </li>
              </>
            ) : (
              <button
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg"
                onClick={() => logoutUser()}
              >
                Logout
              </button>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
