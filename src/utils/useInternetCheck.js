import { useEffect, useState } from "react";

const useInternetCheck = () => {
  const [checkInternet, setCheckInternet] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", () => {
      setCheckInternet(false);
    });
    window.addEventListener("online", () => {
      setCheckInternet(true);
    });
  }, []);
  return checkInternet;
};

export default useInternetCheck;
