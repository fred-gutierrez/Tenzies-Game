import { useEffect, useState } from "react";

export default function useLocalStorage() {
  const [bestRoll, setBestRoll] = useState(
    parseInt(localStorage.getItem("bestRoll")) || 0
  );

  useEffect(() => {
    localStorage.setItem("bestRoll", bestRoll.toString());
  }, [bestRoll]);

  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || 0
  );

  useEffect(() => {
    localStorage.setItem("bestTime", bestTime.toString());
  }, [bestTime]);

  return { bestRoll, setBestRoll, bestTime, setBestTime };
}
