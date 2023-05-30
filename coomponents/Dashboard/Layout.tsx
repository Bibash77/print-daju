import { ReactNode } from "react";
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { wrapper } from "@/store";
export default function DashboardLayout({ children, ...rest }: any) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <main>
        <Provider store={store}>
          <SessionProvider session={...props.session}>
            <ToastContainer />
            <DashboardNavbar />
            <div className="flex">
              <div className="w-1/4">
                <DashboardSidebar />
              </div>
              <div className="w-full">{children}</div>
            </div>
          </SessionProvider>
        </Provider>
      </main>
    </>
  );
}
