import { useEffect } from "react";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/socket");
    };
    fetchData();
  }, []);

  return <Component {...pageProps} />;
};

export default MyApp;
