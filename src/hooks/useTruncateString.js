import { useState, useEffect } from "react";

function useTruncateString(inputString) {
  const [truncatedString, setTruncatedString] = useState("");

  useEffect(() => {
    if (inputString.length > 150) {
      setTruncatedString(inputString.substring(0, 100) + "...");
    } else {
      setTruncatedString(inputString);
    }
  }, [inputString]);

  return truncatedString;
}

export default useTruncateString;
