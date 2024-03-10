import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setLogged, setUser } from "../redux/slices/authedUser";
import axios from "../util/axios";

export default function Logout() {
  const [, , deleteCookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    deleteCookie("refreshToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(setUser({}));
    dispatch(setLogged(false));
    navigate("/");
    dispatch(logout());
  }, [deleteCookie, navigate, dispatch]);
  return null;
}
