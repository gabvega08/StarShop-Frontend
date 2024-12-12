import React, { useEffect, useState } from "react";
import Rolling from "../micro/Rolling";

export default function LoadingSpinner(): React.ReactNode {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Rolling /> : null;
}
