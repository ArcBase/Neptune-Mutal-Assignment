import '../styles/globals.css'
import { ToastProvider } from "react-toast-notifications";
import "../styles/reactToastify.css";


import { wrapper } from "../redux/store";
import { useDispatch } from "react-redux";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastProvider autoDismiss={true} autoDismissTimeout="2000">
        <Component {...pageProps} />
      </ToastProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp);
