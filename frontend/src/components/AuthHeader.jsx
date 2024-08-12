import { Link } from "react-router-dom";

const AuthHeader = ({ type }) => {
  return (
    <section className="text-center space-y-2">
      <h1 className="text-nowrap text-4xl md:text-5xl font-bold">
        {type === "signup" ? "Create an account" : "Login"}
      </h1>

      {type === "signup" ? (
        <p>
          Already have an account?{" "}
          <Link className="underline" to={"/auth/login"}>
            Sign in
          </Link>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <Link className="underline" to={"/auth/signup"}>
            Sign up
          </Link>
        </p>
      )}
    </section>
  );
};

export default AuthHeader;
