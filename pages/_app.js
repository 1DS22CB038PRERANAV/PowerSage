import NavbarComponent from "@/components/NavbarComponent";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthContextProvider } from "@/context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";

const noAuthRequired = ["/", "/login", "/signup"];
export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      <NavbarComponent />
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
