import { useState, useEffect } from "react";

const useUserLocation = () => {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (response.ok) {
          const data = await response.json();
          setLocationData(data);
        } else {
          throw new Error("Unable to fetch location data");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocation();
  }, []);

  return locationData;
};

export default useUserLocation;
