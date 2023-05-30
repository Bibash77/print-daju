import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import ResponsiveAppBar from "@/coomponents/Header";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const dashboardPages = [
    "/dashboard",
    "/dashboard/profile",
    "/dashboard/settings",
  ];
  const isDashboardPage = dashboardPages.some((path) =>
    props.router.pathname.includes(path)
  );
  return (
    <Provider store={store}>
      <SessionProvider session={...props.session}>
        <ToastContainer />
        {isDashboardPage ? (
          <Component {...props.pageProps} />
        ) : (
          <>
            <ResponsiveAppBar />
            <Component {...props.pageProps} />
          </>
        )}
      </SessionProvider>
    </Provider>
  );
}
