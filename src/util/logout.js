import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setLogged, setUser } from "../redux/slices/authedUser";
import axios from "../util/axios";

const Logout = () => {
  const [, , deleteCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const performLogout = async () => {
      try {
        console.log("Before deletion:", document.cookie);
        deleteCookie("refreshToken");
        console.log("After deletion:", document.cookie);
        delete axios.defaults.headers.common["Authorization"];
        dispatch(setUser({}));
        dispatch(setLogged(false));
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };
    performLogout();
  }, [deleteCookie, navigate, dispatch]);
  return null;
};

export default Logout;
