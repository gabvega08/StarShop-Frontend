import React, { useEffect, useState } from "react";
import Eclipse from "../micro/Eclipse";

export default function LoadingSpinner(): React.ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Eclipse /> : null;
}
