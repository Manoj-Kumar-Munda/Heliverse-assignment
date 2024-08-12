import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/v1/user/current-user");
      const data = await res.json();
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};

export default useCurrentUser;
