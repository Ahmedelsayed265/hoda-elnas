import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ToTopOnNavigation = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
};

export default ToTopOnNavigation;
