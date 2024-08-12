import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "./api/auth/getCurrentUser";
import { login, logout } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData ));
      } else {
        dispatch(logout());
      }
    });
  });

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
