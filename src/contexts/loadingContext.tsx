import React, { useContext, useState } from "react";

interface LoadingContextProps {
  setLoading: (isLoading: boolean) => void;
  isLoading?: boolean;
}
export const LoadingContext = React.createContext({} as LoadingContextProps);
const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ ...props }) => {
  const [isLoading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading }}
      {...props}
    ></LoadingContext.Provider>
  );
};

export default useLoading;
