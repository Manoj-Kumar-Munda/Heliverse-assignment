import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, status } = useSelector((store) => store.auth);
  console.log(user);
  console.log(status);

  return (
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
            <button className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg ">
              Logout
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
