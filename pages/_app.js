import TopNav from "../components/TopNav";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../public/css/styles.css";
import useIsClient from "../utils/useIsClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Provider} from "../context";

function MyApp({ Component, pageProps }) {
  const isClient = useIsClient();
  return (
    <>
      {isClient && (
        <Provider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <TopNav />
          <Component {...pageProps} />
        </Provider>
      )}
    </>
  );
}

export default MyApp;
