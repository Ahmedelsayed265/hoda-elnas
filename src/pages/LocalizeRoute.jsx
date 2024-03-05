import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLanguage } from "../redux/slices/language";

const LocalizeRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locale } = useParams();

  useEffect(() => {
    dispatch(setLanguage(locale));
    if (window.location.pathname !== `/${locale}/`) {
      navigate(`/${locale}/`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, locale, navigate]);

  return null;
};

export default LocalizeRoute;
