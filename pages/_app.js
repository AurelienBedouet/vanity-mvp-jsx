import "../styles/globals.css";
import Layout from "../components/Layout";
import {ToastContainer} from "react-toastify";
import {UserContext} from "../context/UserContext";
import useUserData from "../context/useUserData";

export default function App({Component, pageProps}) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Layout>
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={1500}
          hideProgressBar={true}
          pauseOnHover
        />
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}
